import { GetBranchesResponse } from 'src/app/services/api/dto/clients';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GetUserResponse, CreateUserRequest, EditUserRequest, CreateUserResponse, AddProfilePictureRequest } from './dto/users';
import { GetClientResponse, GetDirectorsResponse, GetFullSetDocumentsResponse, AddDirectorRequest, EditDirectorRequest, GetResolutionsResponse, AddLodgementRequest, GetServiceResponse, AddServiceRequest, GetShareholderResponse, EditShareholderRequest, AddResolutionRequest, GetFullSetAccountsResponse, AddFullSetDocumentRequest, AddFullSetAccountRequest, AddAssetListHirePurchaseRequest, GetLodgementResponse, AddShareholderRequest, EditResolutionRequest, EditLodgementRequest, UpdateFullSetAccountRequest, UpdateAssetListHirePurchaseRequest, GetAssetListHirePurchaseResponse, GetAssetListCommitmentsResponse, AddAssetListCommitmentsRequest, UpdateAssetListCommitmentsRequest, AddClientPersonalRequest, AddClientCompanyRequest, UpdateClientPersonalRequest, UpdateClientCompanyRequest, AddBranchesRequest, UpdateBranchesRequest, EditFullSetDocumentRequest, GetFullSetDocumentsMediaResponse, GetMemorandumsResponse, GetMemorandumsMediaResponse, AddMemorandumRequest, EditMemorandumRequest, GetClientsRequest, GetClientsResponse } from './dto/clients';
import { SuccessResponse } from './dto/success';
import { LoginResponse, ForgotPasswordResponse, ResetPasswordRequest } from './dto/auth';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  readonly baseUrl: string = 'https://10.0.100.60:5001/api';

  constructor(private http: HttpClient) { }

  // Credentials

  login(credential) {
    return this.http.post<LoginResponse>(this.baseUrl + '/auth/login', credential);
  }

  forgotPassword(email: string) {
    return this.http.post<ForgotPasswordResponse>(this.baseUrl + '/auth/forgot-password', { email: email });
  }

  resetPassword(resetPasswordRequest: ResetPasswordRequest) {
    return this.http.post<SuccessResponse>(this.baseUrl + '/auth/reset-password', resetPasswordRequest);
  }

  // User

  getProfilePicture() {
    return this.http.get<any>(this.baseUrl + '/user/profile-pic');
  }

  addProfilePicture(addProfilePictureRequest: AddProfilePictureRequest) {
    return this.http.post<any>(this.baseUrl + '/user/profile-pic', addProfilePictureRequest);
  }

  // Admin

  adminCreateUser(createUserRequest: CreateUserRequest) {
    return this.http.post<CreateUserResponse>(this.baseUrl + '/admin/users/create', createUserRequest);
  }

  adminEditUser(editUserRequest: EditUserRequest) {
    return this.http.post<SuccessResponse>(this.baseUrl + '/admin/users/edit', editUserRequest);
  }

  getAllUsers() {
    return this.http.get<GetUserResponse[]>(this.baseUrl + '/admin/users/all');
  }

  getUserDetails() {
    return this.http.get<GetUserResponse>(this.baseUrl + '/user/details');
  }

  // Client

  addClientPersonal(addClientRequest: AddClientPersonalRequest) {
    return this.http.post<SuccessResponse>(this.baseUrl + '/clients/personal/create', addClientRequest);
  }

  addClientCompany(addClientRequest: AddClientCompanyRequest) {
    return this.http.post<SuccessResponse>(this.baseUrl + '/clients/company/create', addClientRequest);
  }

  updateClientPersonal(client: UpdateClientPersonalRequest) {
    return this.http.post<SuccessResponse>(this.baseUrl + '/clients/personal/update', client);
  }

  updateClientCompany(client: UpdateClientCompanyRequest) {
    return this.http.post<SuccessResponse>(this.baseUrl + '/clients/company/update', client);
  }

  // getClients(getClientsRequest: GetClientsRequest) {
  //   return this.http.get<GetClientResponse[]>(this.baseUrl + '/clients');
  // }

  getClients(getClientsRequest: GetClientsRequest) {
    return this.http.post<GetClientsResponse>(this.baseUrl + '/clients', getClientsRequest);
  }

  getClient(id: string) {
    return this.http.get<GetClientResponse>(this.baseUrl + '/clients/' + id);
  }

  deleteClient(id: string) {
    return this.http.post<SuccessResponse>(this.baseUrl + '/clients/' + id + '/delete', null);
  }

  // Client - Branches

  getBranches(id: string) {
    return this.http.get<GetBranchesResponse[]>(this.baseUrl + '/clients/' + id + '/branches');
  }

  addBranches(id: string, addBranchesRequest: AddBranchesRequest) {
    return this.http.post<AddBranchesRequest>(this.baseUrl + '/clients/' + id + '/branches/add', addBranchesRequest);
  }

  updateBranches(id: string, updateBranchesRequest: UpdateBranchesRequest) {
    return this.http.post<GetBranchesResponse>(this.baseUrl + '/clients/' + id + '/branches/update', updateBranchesRequest);
  }

  deleteBranches(id: string, branchId: string) {
    return this.http.post<SuccessResponse>(this.baseUrl + '/clients/' + id + '/branches/' + branchId + '/delete', null);
  }

  // Client - Services Subscription

  getServicesSubscription(id: string) {
    return this.http.get<GetServiceResponse[]>(this.baseUrl + '/clients/' + id + '/service-subscriptions');
  }

  addServiceSubscription(id: string, service: AddServiceRequest) {
    return this.http.post<SuccessResponse>(this.baseUrl + '/clients/' + id + '/service-subscriptions/add', service);
  }

  deleteServiceSubscription(id: string, serviceId: string) {
    return this.http.post<SuccessResponse>(this.baseUrl + '/clients/' + id + '/service-subscriptions/' + serviceId + '/delete', serviceId);
  }

  // Client - Shareholders

  getShareholders(id: string) {
    return this.http.get<GetShareholderResponse[]>(this.baseUrl + '/clients/' + id + '/shareholders');
  }

  addShareholder(id: string, shareholder: AddShareholderRequest) {
    return this.http.post<SuccessResponse>(this.baseUrl + '/clients/' + id + '/shareholders/add', shareholder);
  }

  updateShareholder(id: string, shareholder: EditShareholderRequest) {
    return this.http.post<SuccessResponse>(this.baseUrl + '/clients/' + id + '/shareholders/update', shareholder);
  }

  deleteShareholder(id: string, shareholderId: string) {
    return this.http.post<any>(this.baseUrl + '/clients/' + id + '/shareholders/' + shareholderId + '/delete', shareholderId);
  }

  // Client - Directors

  getDirectors(id: string) {
    return this.http.get<GetDirectorsResponse[]>(this.baseUrl + '/clients/' + id + '/directors');
  }

  addDirector(id: string, director: AddDirectorRequest) {
    return this.http.post<SuccessResponse>(this.baseUrl + '/clients/' + id + '/directors/add', director);
  }

  updateDirector(id: string, director: EditDirectorRequest) {
    return this.http.post<SuccessResponse>(this.baseUrl + '/clients/' + id + '/directors/update', director);
  }

  deleteDirector(id: string, directorId: string) {
    return this.http.post<SuccessResponse>(this.baseUrl + '/clients/' + id + '/directors/' + directorId + '/delete', directorId);
  }

  // Client - Resolutions

  getResolutions(id: string) {
    return this.http.get<GetResolutionsResponse[]>(this.baseUrl + '/clients/' + id + '/resolutions');
  }

  addResolution(id: string, res: AddResolutionRequest) {
    return this.http.post<SuccessResponse>(this.baseUrl + '/clients/' + id + '/resolutions/add', res);
  }

  updateResolution(id: string, res: EditResolutionRequest) {
    return this.http.post<SuccessResponse>(this.baseUrl + '/clients/' + id + '/resolutions/update', res);
  }

  deleteResolution(id: string, resId: string) {
    return this.http.post<SuccessResponse>(this.baseUrl + '/clients/' + id + '/resolutions/' + resId + '/delete', resId);
  }

  // Client - Lodgements

  getLodgmentYears(id: string) {
    return this.http.get<GetLodgementResponse[]>(this.baseUrl + '/clients/' + id + '/lodgements');
  }

  addLodgementYears(id: string, lodgement: AddLodgementRequest) {
    return this.http.post<SuccessResponse>(this.baseUrl + '/clients/' + id + '/lodgements/add', lodgement);
  }

  updateLodgementYears(id: string, lodgement: EditLodgementRequest) {
    return this.http.post<SuccessResponse>(this.baseUrl + '/clients/' + id + '/lodgements/update', lodgement);
  }

  deleteLodgementYears(id: string, lodgementId: string) {
    return this.http.post<SuccessResponse>(this.baseUrl + '/clients/' + id + '/lodgements/' + lodgementId + '/delete', lodgementId);
  }

  // Client - Full Set Documents

  getFullSetDocuments(id: string) {
    return this.http.get<GetFullSetDocumentsResponse[]>(this.baseUrl + '/clients/' + id + '/full-set-documents');
  }

  getFullSetDocumentMedia(id: string, fsdId: string) {
    return this.http.get<GetFullSetDocumentsMediaResponse>(this.baseUrl + '/clients/' + id + '/full-set-documents/' + fsdId + '/media');
  }

  addFullSetDocument(id: string, addFullSetDocumentRequest: AddFullSetDocumentRequest) {
    return this.http.post<SuccessResponse>(this.baseUrl + '/clients/' + id + '/full-set-documents/add', addFullSetDocumentRequest);
  }

  updateFullSetDocument(id: string, editFullSetDocumentRequest: EditFullSetDocumentRequest) {
    return this.http.post<SuccessResponse>(this.baseUrl + '/clients/' + id + '/full-set-documents/update', editFullSetDocumentRequest);
  }

  deleteFullSetDocument(id: string, fsdId: string) {
    return this.http.post<SuccessResponse>(this.baseUrl + '/clients/' + id + '/full-set-documents/' + fsdId + '/delete', null);
  }

  // Client - Memorandums

  getMemorandums(id: string) {
    return this.http.get<GetMemorandumsResponse[]>(this.baseUrl + '/clients/' + id + '/memorandums');
  }

  getMemorandumMedia(id: string, fsdId: string) {
    return this.http.get<GetMemorandumsMediaResponse>(this.baseUrl + '/clients/' + id + '/memorandums/' + fsdId + '/media');
  }

  addMemorandum(id: string, addMemorandumRequest: AddMemorandumRequest) {
    return this.http.post<SuccessResponse>(this.baseUrl + '/clients/' + id + '/memorandums/add', addMemorandumRequest);
  }

  updateMemorandum(id: string, editMemorandumRequest: EditMemorandumRequest) {
    return this.http.post<SuccessResponse>(this.baseUrl + '/clients/' + id + '/memorandums/update', editMemorandumRequest);
  }

  deleteMemorandum(id: string, fsdId: string) {
    return this.http.post<SuccessResponse>(this.baseUrl + '/clients/' + id + '/memorandums/' + fsdId + '/delete', null);
  }

  // Client - Full Set Accounts

  getFullSetAccounts(id: string) {
    return this.http.get<GetFullSetAccountsResponse[]>(this.baseUrl + '/clients/' + id + '/full-set-accounts');
  }

  addFullSetAccount(id: string, addFullSetAccountRequest: AddFullSetAccountRequest) {
    return this.http.post<SuccessResponse>(this.baseUrl + '/clients/' + id + '/full-set-accounts/add', addFullSetAccountRequest);
  }

  updateFullSetAccount(id: string, updateFullSetAccountRequest: UpdateFullSetAccountRequest) {
    return this.http.post<SuccessResponse>(this.baseUrl + '/clients/' + id + '/full-set-accounts/update', updateFullSetAccountRequest);
  }

  deleteFullSetAccount(id: string, fsaId: string) {
    return this.http.post<SuccessResponse>(this.baseUrl + '/clients/' + id + '/full-set-accounts/' + fsaId + '/delete', null);
  }

  // Client - Asset Listing & Hire Purchase

  getAssetListHirePurchases(id: string) {
    return this.http.get<GetAssetListHirePurchaseResponse[]>(this.baseUrl + '/clients/' + id + '/asset-list-hire-purchases');
  }

  addAssetListHirePurchase(id: string, addAssetListHirePurchaseRequest: AddAssetListHirePurchaseRequest) {
    return this.http.post<SuccessResponse>(this.baseUrl + '/clients/' + id + '/asset-list-hire-purchases/add', addAssetListHirePurchaseRequest);
  }

  updateAssetListHirePurchase(id: string, updateAssetListHirePurchaseRequest: UpdateAssetListHirePurchaseRequest) {
    return this.http.post<SuccessResponse>(this.baseUrl + '/clients/' + id + '/asset-list-hire-purchases/update', updateAssetListHirePurchaseRequest);
  }

  deleteAssetListHirePurchase(id: string, alhpId: string) {
    return this.http.post<SuccessResponse>(this.baseUrl + '/clients/' + id + '/asset-list-hire-purchases/' + alhpId + '/delete', null);
  }

  // Client - Asset List Commitments (Tax)

  getAssetListCommitments(id: string) {
    return this.http.get<GetAssetListCommitmentsResponse[]>(this.baseUrl + '/clients/' + id + '/asset-list-commitments');
  }

  addAssetListCommitments(id: string, assetList: AddAssetListCommitmentsRequest) {
    return this.http.post<AddAssetListCommitmentsRequest>(this.baseUrl + '/clients/' + id + '/asset-list-commitments/add', assetList);
  }

  updateAssetListCommitments(id: string, assetList: UpdateAssetListCommitmentsRequest) {
    return this.http.post<UpdateAssetListCommitmentsRequest>(this.baseUrl + '/clients/' + id + '/asset-list-commitments/update', assetList);
  }

  deleteAssetListCommitments(id: string, assetId: string) {
    return this.http.post<SuccessResponse>(this.baseUrl + '/clients/' + id + '/asset-list-commitments/' + assetId + '/delete', assetId);
  }


}
