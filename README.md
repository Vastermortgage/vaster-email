# Vaster Email

Shared, typed transactional email templates for Vaster applications. Templates are built with React Email and render to both HTML and plain text. Applications remain responsible for recipients, authorization, business triggers, attachments, and delivery through AWS SES.

## Development

```bash
bun install
bun run dev
```

The React Email preview server runs at `http://localhost:3001` and includes sample data for every template.

## Verification

```bash
bun run check
bun test
bun run build
```

## Publishing

Releases use the **Publish npm package** GitHub Actions workflow on `main`.
After committing and pushing a version bump, run:

```bash
gh workflow run publish.yml --ref main -f version=0.1.3
```

Replace the version with the exact value in `package.json`. The workflow installs
the frozen lockfile, checks types, builds, and tests before publishing. npm trusts
`Vastermortgage/vaster-email`, workflow `publish.yml`, environment `npm`; that
environment permits deployments only from `main`. Authentication uses OIDC, so
no npm access token or local npm login is needed. GitHub CLI access is still
required to trigger the workflow, or use **Run workflow** in GitHub Actions.

## Template catalog

| Template | Intended use |
| --- | --- |
| `MagicLinkEmail` | Passwordless authentication |
| `InvitationEmail` | Product, organization, or workspace invitations |
| `WelcomeEmail` | First-use and onboarding messages |
| `ApprovalRequestEmail` | Requests requiring review or approval |
| `CommentNotificationEmail` | New discussion comments |
| `RequestUpdatedEmail` | Material changes to an existing request |
| `RequestApprovedEmail` | Explicit approved outcome |
| `RequestRejectedEmail` | Explicit rejected outcome |
| `RequestCompletedEmail` | Explicit completed outcome |
| `WorkflowHandoffEmail` | Moving work from one team or stage to another |
| `ProcessingCompletedEmail` | Successful asynchronous jobs and document processing |
| `ProcessingFailedEmail` | Failed jobs that may require retry or support |
| `FeedbackReceivedEmail` | Internal product feedback reports |
| `ApplicationSharedEmail` | Private-loan application sharing |
| `ApplicationStartedEmail` | New private-loan application alert |

Each template has a matching `render...Email` helper. Renderers return `{ subject, html, text }`, and subjects are stripped of newline characters before delivery.

## Layouts

Operational notifications use `InternalNotificationLayout`, a compact, image-free layout intended for internal apps and team workflows. This includes approvals, comments, request status changes, workflow handoffs, processing results, feedback reports, and new-application alerts.

Account and customer-facing templates use the more prominent branded `NotificationLayout`. This includes magic links, invitations, welcome messages, and shared loan applications.

Both layouts are exported for app-specific templates.

Both layouts include light and dark color schemes, with explicit dark styles for
clients supporting `prefers-color-scheme` and Outlook's `data-ogsc`/`data-ogsb`
hooks. Content primitives include the required `email-*` classes; retain these
when customizing markup so the dark palette can override inline light colors.
Branded logos have a light backing to preserve contrast against dark surfaces.
Email clients that force their own color inversion may still render differently;
check light and dark previews in the delivery app before release.

## Usage

```ts
import { renderMagicLinkEmail } from '@vastermortgage/email'

const message = await renderMagicLinkEmail({
  url: 'https://app.vaster.com/auth/magic-link',
  productName: 'Vaster',
  email: 'person@example.com',
})

await sendEmail({
  to: 'person@example.com',
  ...message,
})
```

## Custom templates

The package also exports the branded layout and content primitives for app-specific templates:

```tsx
import {
  EmailAction,
  EmailHeading,
  EmailParagraph,
  NotificationLayout,
  renderEmail,
} from '@vastermortgage/email'

function CustomEmail() {
  return (
    <NotificationLayout preview="A custom Vaster notification">
      <EmailHeading>Custom notification</EmailHeading>
      <EmailParagraph>App-specific content can still use the shared visual system.</EmailParagraph>
      <EmailAction href="https://example.com">Open item</EmailAction>
    </NotificationLayout>
  )
}

const message = await renderEmail('Custom notification', <CustomEmail />)
```

The package intentionally does not contain an email transport.
