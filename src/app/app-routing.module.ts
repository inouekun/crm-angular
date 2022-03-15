import { AuditComponent } from './pages/base/client-profile/audit/audit.component';
import { AccountComponent } from './pages/base/client-profile/account/account.component';
import { MemorandumComponent } from './pages/base/client-profile/memorandum/memorandum.component';
import { ImportantDateComponent } from './pages/base/client-profile/important-date/important-date.component';
import { ContactDetailsComponent } from './pages/base/client-profile/contact-details/contact-details.component';
import { CompanyOverviewComponent } from './pages/base/client-profile/company-overview/company-overview.component';
import { ClientProfileComponent } from './pages/base/client-profile/client-profile.component';
import { ProfileComponent } from './pages/base/profile/profile.component';
import { RegisterUserComponent } from './pages/base/management/admin/register-user/register-user.component';
import { AuthGuard } from './routing/guards/auth.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignInComponent } from './pages/authentication/sign-in/sign-in.component';
import { ForgotPasswordComponent } from './pages/authentication/forgot-password/forgot-password.component';
import { BaseComponent } from './pages/base/base.component';
import { DashboardComponent } from './pages/base/dashboard/dashboard.component';
import { UserListComponent } from './pages/base/management/admin/user-list/user-list.component';
import { ClientListComponent } from './pages/base/client-list/client-list.component';
import { ResetPasswordComponent } from './pages/authentication/reset-password/reset-password.component';
import { ShareholdersDirectorsComponent } from './pages/base/client-profile/shareholders-directors/shareholders-directors.component';
import { ResolutionsComponent } from './pages/base/client-profile/resolutions/resolutions.component';
import { LodgementComponent } from './pages/base/client-profile/lodgement/lodgement.component';
import { DocumentsComponent } from './pages/base/client-profile/documents/documents.component';
import { TaxComponent } from './pages/base/client-profile/tax/tax.component';

const routes: Routes = [
  {
    path: 'sign-in',
    component: SignInComponent
  },
  {
    path: 'forgot-password',
    component: ForgotPasswordComponent
  },
  {
    path: 'reset-password',
    component: ResetPasswordComponent
  },
  {
    path: '',
    component: BaseComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', component: DashboardComponent },
      { path: 'profile', component: ProfileComponent },
      { path: 'admin/register', component: RegisterUserComponent },
      { path: 'admin/user-list', component: UserListComponent },
      {
        path: 'client/:id',
        component: ClientProfileComponent,
        children: [
          { path: '', component: CompanyOverviewComponent },
          { path: 'contact', component: ContactDetailsComponent },
          { path: 'shareholders-directors', component: ShareholdersDirectorsComponent },
          { path: 'important-date', component: ImportantDateComponent },
          { path: 'resolutions', component: ResolutionsComponent },
          { path: 'memorandum', component: MemorandumComponent },
          { path: 'lodgement', component: LodgementComponent },
          { path: 'documents', component: DocumentsComponent },
          { path: 'account', component: AccountComponent },
          { path: 'audit', component: AuditComponent },
          { path: 'tax', component: TaxComponent }
        ]
      },
      { path: 'client-list', component: ClientListComponent }
    ]
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
