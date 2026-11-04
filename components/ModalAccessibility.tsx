"use client";

import { useEffect } from "react";

const focusableSelector = [
  "a[href]",
  "button:not([disabled])",
  "input:not([disabled]):not([type='hidden'])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  "[tabindex]:not([tabindex='-1'])",
].join(",");

export default function ModalAccessibility() {
  useEffect(() => {
    let activeDialog: HTMLElement | null = null;
    let previouslyFocused: HTMLElement | null = null;

    const getFocusableElements = (dialog: HTMLElement) =>
      Array.from(dialog.querySelectorAll<HTMLElement>(focusableSelector)).filter(
        (element) =>
          element.getAttribute("aria-hidden") !== "true" &&
          element.getClientRects().length > 0
      );

    const syncDialog = () => {
      const dialogs = document.querySelectorAll<HTMLElement>(
        '[role="dialog"][aria-modal="true"]'
      );
      const nextDialog = dialogs.item(dialogs.length - 1);

      if (nextDialog === activeDialog) return;

      if (activeDialog && previouslyFocused?.isConnected) {
        previouslyFocused.focus();
      }

      activeDialog = nextDialog ?? null;
      if (!activeDialog) {
        previouslyFocused = null;
        return;
      }

      previouslyFocused =
        document.activeElement instanceof HTMLElement
          ? document.activeElement
          : null;

      if (!activeDialog.hasAttribute("tabindex")) {
        activeDialog.tabIndex = -1;
      }

      const firstFocusable = getFocusableElements(activeDialog)[0];
      (firstFocusable ?? activeDialog).focus();
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (!activeDialog?.isConnected) return;

      if (event.key === "Escape") {
        const closeButton = Array.from(
          activeDialog.querySelectorAll<HTMLButtonElement>("button")
        ).find((button) => {
          const label = button.getAttribute("aria-label")?.toLowerCase();
          const text = button.innerText.trim();
          return label?.includes("close") || text === "×" || text === "✕" || text === "Close";
        });

        if (closeButton) {
          event.preventDefault();
          closeButton.click();
        }
        return;
      }

      if (event.key !== "Tab") return;

      const focusable = getFocusableElements(activeDialog);
      if (focusable.length === 0) {
        event.preventDefault();
        activeDialog.focus();
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const current = document.activeElement;

      if (event.shiftKey && (current === first || !activeDialog.contains(current))) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && (current === last || !activeDialog.contains(current))) {
        event.preventDefault();
        first.focus();
      }
    };

    const observer = new MutationObserver(syncDialog);
    observer.observe(document.body, { childList: true, subtree: true });
    document.addEventListener("keydown", handleKeyDown);
    syncDialog();

    return () => {
      observer.disconnect();
      document.removeEventListener("keydown", handleKeyDown);
      if (previouslyFocused?.isConnected) previouslyFocused.focus();
    };
  }, []);

  return null;
}
