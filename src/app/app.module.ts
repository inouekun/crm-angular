import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AuthInterceptor } from './interceptors/auth.interceptor';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from './material';

import { UserListComponent } from './pages/base/management/admin/user-list/user-list.component';
import { SignInComponent } from './pages/authentication/sign-in/sign-in.component';
import { ForgotPasswordComponent } from './pages/authentication/forgot-password/forgot-password.component';
import { BaseComponent } from './pages/base/base.component';
import { DashboardComponent } from './pages/base/dashboard/dashboard.component';
import { RegisterUserComponent } from './pages/base/management/admin/register-user/register-user.component';
import { TokenExpiredDialogComponent } from './pages/dialog/token-expired-dialog/token-expired-dialog.component';
import { EditUserDialogComponent } from './pages/dialog/edit-user-dialog/edit-user-dialog.component';
import { ProfileComponent } from './pages/base/profile/profile.component';
import { ClientProfileComponent } from './pages/base/client-profile/client-profile.component';
import { ClientListComponent } from './pages/base/client-list/client-list.component';
import { ResetPasswordComponent } from './pages/authentication/reset-password/reset-password.component';
import { CompanyOverviewComponent } from './pages/base/client-profile/company-overview/company-overview.component';
import { ContactDetailsComponent } from './pages/base/client-profile/contact-details/contact-details.component';
import { ShareholdersDirectorsComponent } from './pages/base/client-profile/shareholders-directors/shareholders-directors.component';
import { ImportantDateComponent } from './pages/base/client-profile/important-date/important-date.component';
import { ResolutionsComponent } from './pages/base/client-profile/resolutions/resolutions.component';
import { MemorandumComponent } from './pages/base/client-profile/memorandum/memorandum.component';
import { LodgementComponent } from './pages/base/client-profile/lodgement/lodgement.component';
import { DocumentsComponent } from './pages/base/client-profile/documents/documents.component';
import { AccountComponent } from './pages/base/client-profile/account/account.component';
import { AuditComponent } from './pages/base/client-profile/audit/audit.component';
import { TaxComponent } from './pages/base/client-profile/tax/tax.component';

import { RegisterClientDialogComponent } from './pages/dialog/register-client-dialog/register-client-dialog.component';
import { ProfilePictureDialogComponent } from './pages/dialog/user-details/profile-picture-dialog/profile-picture-dialog.component';
import { ManageFullSetAccDialogComponent } from './pages/dialog/client-details/manage-full-set-acc-dialog/manage-full-set-acc-dialog.component';
import { ManageAccountListAssetsDialogComponent } from './pages/dialog/client-details/manage-account-list-assets-dialog/manage-account-list-assets-dialog.component';
import { ManageAssetListCommitmentsComponent } from './pages/dialog/client-details/manage-asset-list-commitments/manage-asset-list-commitments.component';
import { ManageDirectorDialogComponent } from './pages/dialog/client-details/manage-director-dialog/manage-director-dialog.component';
import { ManageLodgementDialogComponent } from './pages/dialog/client-details/manage-lodgement-dialog/manage-lodgement-dialog.component';
import { ManageResolutionDialogComponent } from './pages/dialog/client-details/manage-resolution-dialog/manage-resolution-dialog.component';
import { ManageServiceDialogComponent } from './pages/dialog/client-details/manage-service-dialog/manage-service-dialog.component';
import { ManageShareholderDialogComponent } from './pages/dialog/client-details/manage-shareholder-dialog/manage-shareholder-dialog.component';
import { SuccessDialogComponent } from './pages/dialog/success-dialog/success-dialog.component';
import { ErrorDialogComponent } from './pages/dialog/error-dialog/error-dialog.component';
import { EditCompanyDetailsDialogComponent } from './pages/dialog/client-details/edit-company-details-dialog/edit-company-details-dialog.component';
import { EditContactDetailDialogComponent } from './pages/dialog/client-details/edit-contact-detail-dialog/edit-contact-detail-dialog.component';
import { ManageBranchDialogComponent } from './pages/dialog/client-details/manage-branch-dialog/manage-branch-dialog.component';
import { ManageDocumentsDialogComponent } from './pages/dialog/client-details/manage-documents-dialog/manage-documents-dialog.component';
import { EditResolutionRemarkDialogComponent } from './pages/dialog/client-details/edit-resolution-remark-dialog/edit-resolution-remark-dialog.component';
import { EditNatureBusinessDialogComponent } from './pages/dialog/client-details/edit-nature-business-dialog/edit-nature-business-dialog.component';
import { EditImportantDateDialogComponent } from './pages/dialog/client-details/edit-important-date-dialog/edit-important-date-dialog.component';
import { PersonalOverviewComponent } from './pages/base/client-profile/personal-overview/personal-overview.component';
import { EditPersonalDetailsDialogComponent } from './pages/dialog/client-details/edit-personal-details-dialog/edit-personal-details-dialog.component';
import { EditAuditDetailsDialogComponent } from './pages/dialog/client-details/edit-audit-details-dialog/edit-audit-details-dialog.component';
import { EditTaxDetailsDialogComponent } from './pages/dialog/client-details/edit-tax-details-dialog/edit-tax-details-dialog.component';
import { ManageMemorandumDialogComponent } from './pages/dialog/client-details/manage-memorandum-dialog/manage-memorandum-dialog.component';
import { DeleteConfirmDialogComponent } from './pages/dialog/delete-confirm-dialog/delete-confirm-dialog.component';
import { ReminderDialogComponent } from './pages/dialog/reminder-dialog/reminder-dialog.component';
import { ResolveReminderDialogComponent } from './pages/dialog/resolve-reminder-dialog/resolve-reminder-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    ForgotPasswordComponent,
    BaseComponent,
    RegisterUserComponent,
    UserListComponent,
    DashboardComponent,
    TokenExpiredDialogComponent,
    EditUserDialogComponent,
    ProfileComponent,
    ClientProfileComponent,
    ClientListComponent,
    ResetPasswordComponent,
    CompanyOverviewComponent,
    ContactDetailsComponent,
    ShareholdersDirectorsComponent,
    ImportantDateComponent,
    ResolutionsComponent,
    MemorandumComponent,
    LodgementComponent,
    DocumentsComponent,
    AccountComponent,
    AuditComponent,
    TaxComponent,
    RegisterClientDialogComponent,
    RegisterClientDialogComponent,
    ProfilePictureDialogComponent,
    ManageFullSetAccDialogComponent,
    ManageAccountListAssetsDialogComponent,
    ManageAssetListCommitmentsComponent,
    ManageDirectorDialogComponent,
    ManageLodgementDialogComponent,
    ManageResolutionDialogComponent,
    ManageServiceDialogComponent,
    ManageShareholderDialogComponent,
    SuccessDialogComponent,
    ErrorDialogComponent,
    EditCompanyDetailsDialogComponent,
    EditContactDetailDialogComponent,
    ManageBranchDialogComponent,
    ManageDocumentsDialogComponent,
    EditResolutionRemarkDialogComponent,
    EditNatureBusinessDialogComponent,
    EditImportantDateDialogComponent,
    PersonalOverviewComponent,
    EditPersonalDetailsDialogComponent,
    EditAuditDetailsDialogComponent,
    EditTaxDetailsDialogComponent,
    ManageMemorandumDialogComponent,
    DeleteConfirmDialogComponent,
    ReminderDialogComponent,
    ResolveReminderDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    TokenExpiredDialogComponent,
    EditUserDialogComponent,
    RegisterClientDialogComponent,
    ProfilePictureDialogComponent,
    ManageFullSetAccDialogComponent,
    ManageAccountListAssetsDialogComponent,
    ManageAssetListCommitmentsComponent,
    ManageDirectorDialogComponent,
    ManageLodgementDialogComponent,
    ManageResolutionDialogComponent,
    ManageServiceDialogComponent,
    ManageShareholderDialogComponent,
    SuccessDialogComponent,
    ErrorDialogComponent,
    EditCompanyDetailsDialogComponent,
    EditContactDetailDialogComponent,
    ManageBranchDialogComponent,
    ManageDocumentsDialogComponent,
    EditResolutionRemarkDialogComponent,
    EditNatureBusinessDialogComponent,
    EditImportantDateDialogComponent,
    EditPersonalDetailsDialogComponent,
    EditAuditDetailsDialogComponent,
    EditTaxDetailsDialogComponent,
    ManageMemorandumDialogComponent,
    DeleteConfirmDialogComponent,
    ReminderDialogComponent,
    ResolveReminderDialogComponent
  ]
})
export class AppModule { }
