```markdown
# Modern Event Ticketing Platform - File Structure

## Root Directory
```
/
├── .bolt/                  # Bolt configuration
│   ├── config.json
│   ├── ignore
│   └── prompt
├── public/                 # Static assets
├── src/                    # Source code
├── .gitignore             # Git ignore rules
├── eslint.config.js       # ESLint configuration
├── form-builder.md        # Form builder documentation
├── index.html             # Entry HTML file
├── package.json           # Project dependencies
├── package-lock.json      # Lock file for dependencies
├── postcss.config.js      # PostCSS configuration
├── PROJECT_STRUCTURE.md   # This file
├── README.md              # Project documentation
├── tailwind.config.js     # Tailwind CSS configuration
├── tsconfig.app.json      # TypeScript app config
├── tsconfig.json          # TypeScript base config
├── tsconfig.node.json     # TypeScript Node config
└── vite.config.ts         # Vite configuration
```

## Source Directory (`/src`)

### Core Application Files
```
src/
├── App.tsx                # Root component
├── index.css             # Global styles
├── main.tsx             # Application entry point
└── vite-env.d.ts        # Vite type declarations
```

### Components (`/src/components`)

#### Admin Components
```
src/components/admin/
├── index.ts                     # Admin components barrel
├── AddTenantModal.tsx          # Tenant creation modal
├── AiInsightsTab.tsx           # AI insights dashboard
├── AnalyticsTab.tsx            # Analytics dashboard
├── ApiManagementTab.tsx        # API management interface
├── AuditTab.tsx                # Audit logs viewer
├── BackupTab.tsx               # Backup management
├── ContentModerationTab.tsx    # Content moderation
├── EventsTab.tsx               # Events management
├── IntegrationsTab.tsx         # Integrations management
├── OverviewTab.tsx             # Admin overview
├── PlansTab.tsx                # Subscription plans
├── ReportsTab.tsx              # Reports generation
├── ResourceManagementTab.tsx   # Resource management
├── ResourcesTab.tsx            # Resources overview
├── RoleManagement.tsx          # Role management
├── SearchTab.tsx               # Search interface
├── SecurityTab.tsx             # Security settings
├── SettingsTab.tsx             # Admin settings
├── SuperAdminDashboard.tsx     # Super admin interface
├── SupportTab.tsx              # Support management
├── SystemTab.tsx               # System settings
├── TenantDashboard.tsx         # Tenant dashboard
├── TenantDetailPage.tsx        # Tenant details
├── TenantUserModal.tsx         # Tenant user management
├── TenantsTab.tsx              # Tenants list
├── UserManagementView.tsx      # User management
├── WhiteLabelModal.tsx         # White labeling settings
└── tenant-detail/              # Tenant detail components
    ├── AccountDetailsView.tsx
    ├── BasicInfoView.tsx
    ├── BillingView.tsx
    ├── CustomizationView.tsx
    ├── QuotasView.tsx
    ├── SecurityView.tsx
    ├── TenantDetailPage.tsx
    ├── UsageAnalyticsView.tsx
    └── UserManagementView.tsx
```

#### Auth Components
```
src/components/auth/
└── LoginForm.tsx               # Authentication form
```

#### Billing Components
```
src/components/billing/
├── BillingDashboard.tsx       # Billing dashboard
├── BillingOverview.tsx        # Billing overview
├── InvoiceHistory.tsx         # Invoice history
├── PaymentMethods.tsx         # Payment methods
└── SubscriptionDetails.tsx    # Subscription details
```

#### Common Components
```
src/components/common/
├── AnimatedCard.tsx           # Animated card component
├── FormInput.tsx             # Form input component
├── FormSelect.tsx            # Form select component
├── LoadingSpinner.tsx        # Loading indicator
├── PermissionGate.tsx        # Permission checker
├── SkeletonLoader.tsx        # Loading skeleton
├── Toast.tsx                 # Toast notifications
├── TwoFactorSetup.tsx        # 2FA setup component
└── index.ts                  # Common components barrel
```

#### Dashboard Components
```
src/components/dashboard/
├── RecentActivity.tsx        # Recent activity feed
├── SavedEvents.tsx           # Saved events list
├── UpcomingEvents.tsx        # Upcoming events list
├── UserDashboard.tsx         # User dashboard
├── UserStats.tsx             # User statistics
└── index.ts                  # Dashboard components barrel
```

#### Event Components
```
src/components/events/
├── EventCard.tsx             # Event card component
├── EventDetails.tsx          # Event details view
├── EventForm.tsx             # Event creation form
├── agenda/                   # Agenda components
│   └── AgendaBuilder.tsx
├── registration/             # Registration components
│   ├── FormPreview.tsx
│   └── RegistrationForm.tsx
├── sections/                 # Event sections
│   ├── EventActions.tsx
│   └── EventAnalytics.tsx
├── tickets/                  # Ticket components
│   └── TicketTypeBuilder.tsx
└── wizard/                   # Event creation wizard
    ├── QuickStartWizard.tsx
    ├── WizardProgress.tsx
    └── steps/
        ├── AccessLevelStep.tsx
        ├── AttendanceStep.tsx
        ├── BasicInfoStep.tsx
        ├── BrandingStep.tsx
        ├── ContactStep.tsx
        └── PreviewStep.tsx
```

#### Form Builder Components
```
src/components/form-builder/
├── BuilderCanvas.tsx         # Form builder canvas
├── ElementToolbox.tsx        # Element selection toolbox
├── FieldList.tsx            # Field list component
├── FieldWrapper.tsx         # Field wrapper component
├── FormBuilder.tsx          # Main form builder
├── FormPreview.tsx          # Form preview
├── PropertiesPanel.tsx      # Properties editor
├── SortableField.tsx        # Sortable field
├── SortableWrapper.tsx      # Sortable container
├── ToolboxPanel.tsx         # Toolbox panel
├── constants.ts             # Form builder constants
├── fields/                  # Form field components
│   ├── AddressField.tsx
│   ├── CheckboxField.tsx
│   ├── CountryField.tsx
│   ├── DateTimeField.tsx
│   ├── DropdownField.tsx
│   ├── EmailField.tsx
│   ├── FileUploadField.tsx
│   ├── HtmlField.tsx
│   ├── ImageUploadField.tsx
│   ├── MultipleChoiceField.tsx
│   ├── NameField.tsx
│   ├── NumericField.tsx
│   ├── PhoneField.tsx
│   ├── RadioField.tsx
│   ├── SelectField.tsx
│   ├── TextAreaField.tsx
│   ├── TextField.tsx
│   ├── UrlField.tsx
│   ├── index.ts
│   └── index.tsx
├── hooks/                   # Form builder hooks
│   └── useFormBuilder.ts
├── index.ts                # Form builder barrel
└── types.ts                # Form builder types
```

#### Organizer Components
```
src/components/organizer/
├── OrganizerDashboard.tsx   # Organizer dashboard
├── event-dashboard/         # Event dashboard
│   ├── EventDashboard.tsx
│   ├── attendees/           # Attendee management
│   │   ├── AttendeeGroups.tsx
│   │   ├── AttendeeList.tsx
│   │   ├── AttendeeMetrics.tsx
│   │   ├── AttendeeProfile.tsx
│   │   ├── BulkActions.tsx
│   │   ├── communication/
│   │   │   ├── AttendeeMessage.tsx
│   │   │   ├── EmailTemplates.tsx
│   │   │   └── SendEmailButton.tsx
│   │   ├── filters/
│   │   │   └── AdvancedFilter.tsx
│   │   └── modals/
│   │       ├── AddAttendeeModal.tsx
│   │       ├── CreateGroupModal.tsx
│   │       ├── DeleteConfirmationModal.tsx
│   │       ├── EditGroupModal.tsx
│   │       ├── ImportAttendeesModal.tsx
│   │       └── MembersModal.tsx
│   ├── checkin/             # Check-in system
│   │   ├── AttendeeQRCode.tsx
│   │   ├── CheckInHistory.tsx
│   │   └── CheckInScanner.tsx
│   └── tabs/                # Dashboard tabs
│       ├── AgendaTab.tsx
│       ├── AnalyticsTab.tsx
│       ├── AttendeesTab.tsx
│       ├── CheckInTab.tsx
│       ├── DashboardTab.tsx
│       ├── EmailsTab.tsx
│       ├── EventOverview.tsx
│       ├── ExhibitorsTab.tsx
│       ├── MessagesTab.tsx
│       ├── MobileAppTab.tsx
│       ├── NetworkingTab.tsx
│       ├── NotificationsTab.tsx
│       ├── OverviewTab.tsx
│       ├── RegistrationTab.tsx
│       ├── SettingsTab.tsx
│       ├── TicketsTab.tsx
│       └── WebsiteTab.tsx
└── tabs/                    # Organizer tabs
    ├── AnalyticsTab.tsx
    ├── AttendeesTab.tsx
    ├── EventsTab.tsx
    ├── OverviewTab.tsx
    ├── PromotionsTab.tsx
    ├── ReportsTab.tsx
    ├── SettingsTab.tsx
    └── index.ts
```

#### Shared Components
```
src/components/shared/
├── forms/                   # Shared form components
│   ├── FormInput.tsx
│   └── FormSelect.tsx
└── layouts/                 # Shared layouts
    ├── AnimatedCard.tsx
    └── LoadingSpinner.tsx
```

#### Other Components
```
src/components/
├── AuthModal.tsx           # Authentication modal
├── EventCard.tsx           # Event card component
├── EventForm.tsx           # Event form component
├── Hero.tsx               # Hero section
├── ImpersonateButton.tsx  # User impersonation
├── ImpersonationBanner.tsx # Impersonation notice
├── Navbar.tsx             # Navigation bar
├── SearchBar.tsx          # Search component
├── SuperAdminDashboard.tsx # Super admin dashboard
├── TicketPurchaseModal.tsx # Ticket purchase modal
└── UserProfile.tsx        # User profile component
```

### Contexts (`/src/contexts`)
```
src/contexts/
├── AdminContext.tsx        # Admin state management
├── AuthContext.tsx         # Authentication state
├── EventContext.tsx        # Event management state
├── RegistrationContext.tsx # Registration state
├── SystemContext.tsx       # System state
├── TenantContext.tsx       # Tenant management state
└── ToastContext.tsx        # Toast notifications state
```

### Hooks (`/src/hooks`)
```
src/hooks/
├── useAdmin.ts             # Admin functionality
├── useAttendees.ts         # Attendee management
├── useCollection.ts        # Firestore collection
├── useDocument.ts          # Firestore document
├── useEventCreation.ts     # Event creation
├── useEvents.ts            # Event management
├── useFirebaseAuth.ts      # Firebase auth
├── useFormBuilder.ts       # Form builder
├── useRoleChange.ts        # Role management
├── useRoleManagement.ts    # Role permissions
├── useSync.ts              # Data synchronization
└── useTwoFactorAuth.ts     # 2FA management
```

### Library (`/src/lib`)
```
src/lib/
├── db/                     # Database utilities
│   ├── collections.ts      # Collection operations
│   ├── index.ts           # Database barrel
│   └── schema.ts          # Database schema
└── firebase.ts            # Firebase configuration
```

### Modules (`/src/modules`)
```
src/modules/
└── Analytics/              # Analytics module
    ├── components/         # Analytics components
    │   └── DashboardMetrics.tsx
    ├── hooks/             # Analytics hooks
    │   └── useAnalytics.ts
    ├── index.ts           # Analytics barrel
    └── services/          # Analytics services
        └── analyticsService.ts
```

### Services (`/src/services`)
```
src/services/
├── AccessControlService.ts  # Access control
├── AdminService.ts         # Admin operations
├── AIService.ts            # AI functionality
├── ContentModerationService.ts # Content moderation
├── EventService.ts         # Event management
├── PaymentService.ts       # Payment processing
├── RegistrationService.ts  # Registration handling
├── RoleService.ts          # Role management
├── SecurityService.ts      # Security features
├── SupportService.ts       # Support system
├── TwoFactorService.ts     # 2FA service
├── firestore.ts           # Firestore operations
├── mockData/              # Mock data
│   └── events.ts
├── storage.ts             # Storage operations
└── syncService.ts         # Data synchronization
```

### Styles (`/src/styles`)
```
src/styles/
└── animations.css          # CSS animations
```

### Types (`/src/types`)
```
src/types/
├── form.ts                # Form types
├── index.ts              # Type definitions
├── registration.ts       # Registration types
└── sync.ts              # Sync types
```
```