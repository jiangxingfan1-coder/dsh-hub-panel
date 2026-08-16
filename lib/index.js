/**
 * dsh-hub-panel host face — a thin shell for the client Settings page.
 *
 * Deliberately minimal: the browsing UI is pure client-side (fetches the
 * public hub index over HTTPS); the agent-facing hub tools live in a separate
 * plugin (dsh-hub-tools) so each face can be adopted independently.
 * Host config is reserved for a future custom indexUrl handoff.
 */
export const name = 'hub-panel'

export function apply(ctx, config = {}) {
  // No host-side effects. The dual-face loader serves ./client into the web
  // UI; everything the panel needs comes from the public index endpoint.
}
