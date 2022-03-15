// Client

export interface GetClientsRequest {
  filter: string;
  sortOrder: string;
  pageIndex: number;
  pageSize: number;
}

export interface GetClientsResponse {
  clients: Client[];
  totalPage: number;
  pageIndex: number;
  totalCount: number;
}

export interface Client {
  id: string;
  name: string;
  businessType: string;
  contactNo: string;
  contactPerson: string;
  email: string;
}

export interface GetClientResponse {
  id: string;
  name: string;
  employerNo: string;
  businessType: string;
  incomeTaxNo: string;
  contactNo: string;
  contactPerson: string;
  email: string;
  remarks: string;
  lastTaxSubmittedYear: number;
  lastTaxSubmittedDate: Date;
  taxPayerInfo: string;
  postalAddrLine1: string;
  postalAddrLine2: string;
  postalAddrCity: string;
  postalAddrPostCode: string;
  postalAddrState: string;
  personalDetails?: PersonalDetail;
  companyDetails?: CompanyDetail;
}

export interface PersonalDetail {
  id: string;
  icNo: string;
  clientId: string;
}

export interface CompanyDetail {
  id: string;
  companyNo: string;
  businessAddrLine1: string;
  businessAddrLine2: string;
  businessAddrCity: string;
  businessAddrPostCode: string;
  businessAddrState: string;
  incorporationDate: Date;
  natureOfBusiness: string;
  annualYearEndDate: Date;
  annualReturnsDate: Date;
  agmDate: Date;
  annualReturnsPaidDate: Date;
  annualReturnsSubmittedDate: Date;
  annualReturnsLastAuditedDate: Date;
  financialStatementsPaidDate: Date;
  financialStatementsSubmittedDate: Date;
  lastAuditedReportDate: Date;
  clientId: string;
}

export interface AddClientPersonalRequest {
  name: string;
  icNo: string;
  businessType: string;
  contactNo: string;
  remarks?: string;
  contactPerson: string;
  email: string;
  incorporationDate?: Date;
  annualYearEndDate?: Date;
  agmDate?: Date;
  annualReturnsDate?: Date;
  incomeTaxNo?: string;
  employerNo?: string;
  lastTaxSubmittedYear?: number;
  lastTaxSubmittedDate?: Date;
  postalAddrLine1: string;
  postalAddrLine2?: string;
  postalAddrCity: string;
  postalAddrPostCode: string;
  postalAddrState: string;
  deletedAt?: any;
  serviceSubscription?: any;
}

export interface AddClientCompanyRequest {
  name: string;
  businessType: string;
  contactNo: string;
  remarks?: string;
  contactPerson: string;
  email: string;
  companyNo?: string;
  businessAddrLine1: string;
  businessAddrLine2?: string;
  businessAddrCity: string;
  businessAddrPostCode: string;
  businessAddrState: string;
  postalAddrLine1: string;
  postalAddrLine2?: string;
  postalAddrCity: string;
  postalAddrPostCode: string;
  postalAddrState: string;
  incorporationDate?: Date;
  natureOfBusiness?: string;
  annualYearEndDate?: Date;
  annualReturnsDate?: Date;
  agmDate?: Date;
  annualReturnsPaidDate?: Date;
  annualReturnsSubmittedDate?: Date;
  annualReturnsLastAuditedDate?: Date;
  financialStatementsPaidDate?: Date;
  financialStatementsSubmittedDate?: Date;
  incomeTaxNo?: string;
  employerNo?: string;
  lastTaxSubmittedYear?: number;
  lastTaxSubmittedDate?: Date;
  deletedAt?: any;
  serviceSubscription?: any;
}

export interface UpdateClientCompanyRequest {
  id: string;
  name: string;
  companyNo: string;
  businessType: string;
  contactNo: string;
  contactPerson: string;
  email: string;
  remarks: string;
  taxPayerInfo: string;
  businessAddrLine1: string;
  businessAddrLine2: string;
  businessAddrCity: string;
  businessAddrPostCode: string;
  businessAddrState: string;
  postalAddrLine1: string;
  postalAddrLine2: string;
  postalAddrCity: string;
  postalAddrPostCode: string;
  postalAddrState: string;
  incorporationDate: Date;
  natureOfBusiness: string;
  annualYearEndDate: Date;
  annualReturnsDate: Date;
  agmDate: Date;
  annualReturnsPaidDate: Date;
  annualReturnsSubmittedDate: Date;
  annualReturnsLastAuditedDate: Date;
  financialStatementsPaidDate: Date;
  financialStatementsSubmittedDate: Date;
  lastAuditedReportDate: Date;
  incomeTaxNo: string;
  employerNo: string;
  lastTaxSubmittedYear: number;
  lastTaxSubmittedDate: Date;
}

export interface UpdateClientPersonalRequest {
  id: string;
  name: string;
  icNo: string;
  businessType: string;
  contactNo: string;
  remark: string;
  contactPerson: string;
  email: string;
  taxPayerInfo: string;
  incomeTaxNo: string;
  employerNo: string;
  lastTaxSubmittedYear: number;
  lastTaxSubmittedDate: Date;
  postalAddrLine1: string;
  postalAddrLine2: string;
  postalAddrCity: string;
  postalAddrPostCode: string;
  postalAddrState: string;
}

// Client - Shareholders

export interface GetShareholderResponse {
  id: string;
  name: string;
  shareValue: number;
  clientId: string;
}

export interface AddShareholderRequest {
  name: string;
  shareValue: number;
}

export interface EditShareholderRequest {
  id: string;
  name: string;
  shareValue: number;
}

// Client Details - Directors

export interface GetDirectorsResponse {
  id: string;
  clientId: string;
  name: string;
}

export interface AddDirectorRequest {
  name: string;
}

export interface EditDirectorRequest {
  id: string;
  name: string;
}

// Client Details - Resolutions

export interface GetResolutionsResponse {
  id: string;
  title: string;
  resolutionDate: Date;
  clientId: string;
}

export interface AddResolutionRequest {
  title: string;
  resolutionDate: Date;
}

export interface EditResolutionRequest {
  id: string;
  title: string;
  resolutionDate: Date;
}

// Client Details - Lodgements

export interface GetLodgementResponse {
  id: string;
  year: number;
  financialYearEndDate: Date;
  annualReturnDate: Date;
  clientId: string;
}

export interface AddLodgementRequest {
  year: number;
  financialYearEndDate: Date;
  annualReturnDate: Date;
}

export interface EditLodgementRequest {
  id: string;
  year: number;
  financialYearEndDate: Date;
  annualReturnDate: Date;
}

// Client Details - Full Set Accounts

export interface GetFullSetAccountsResponse {
  id: string;
  clientId: string;
  title: string;
  date: Date;
}

export interface AddFullSetAccountRequest {
  title: string;
  date: Date;
}

export interface UpdateFullSetAccountRequest {
  id: string;
  title: string;
  date: Date;
}

// Client Details - Full Set Documents

export interface GetFullSetDocumentsResponse {
  id: string;
  documentType: string;
  uploadDate: Date;
  clientId: string;
}

export interface GetFullSetDocumentsMediaResponse {
  fileName: string;
  extension: string;
  data: string;
}

export interface AddFullSetDocumentRequest {
  documentType: string;
  media: Media;
}

export interface EditFullSetDocumentRequest {
  id: string;
  documentType: string;
}

// Client Details - Memorandums

export interface GetMemorandumsResponse {
  id: string;
  title: string;
  uploadDate: Date;
  clientId: string;
}

export interface GetMemorandumsMediaResponse {
  fileName: string;
  extension: string;
  data: string;
}

export interface AddMemorandumRequest {
  title: string;
  media: Media;
}

export interface EditMemorandumRequest {
  id: string;
  title: string;
}

// Client Details - Asset Listing & Hire Purchase

export interface GetAssetListHirePurchaseResponse {
  id: string;
  clientId: string;
  title: string;
}

export interface AddAssetListHirePurchaseRequest {
  title: string;
}

export interface UpdateAssetListHirePurchaseRequest {
  id: string;
  title: string;
}

// Client Details - Asset List Commitments

export interface GetAssetListCommitmentsResponse {
  id: string;
  clientId: string;
  title: string;
  value: number;
}

export interface AddAssetListCommitmentsRequest {
  title: string;
  value: number;
}

export interface UpdateAssetListCommitmentsRequest {
  id: string;
  title: string;
  value: number;
}

// Client - Services

export interface GetServiceResponse {
  id: string;
  clientId: string;
  service: string;
}

export interface AddServiceRequest {
  service: string;
}

// Client - Branches

export interface GetBranchesResponse {
  id: string;
  name: string;
  branchAddressLine1: string;
  branchAddressLine2: string;
  branchAddressPostCode: string;
  branchAddressCity: string;
  branchAddressState: string;
  clientId: string;
}

export interface AddBranchesRequest {
  name: string;
  branchAddressLine1: string;
  branchAddressLine2: string;
  branchAddressPostCode: string;
  branchAddressCity: string;
  branchAddressState: string;
}

export interface UpdateBranchesRequest {
  id: string;
  name: string;
  branchAddressLine1: string;
  branchAddressLine2: string;
  branchAddressPostCode: string;
  branchAddressCity: string;
  branchAddressState: string;
}

// Media

export interface Media {
  fileName: string;
  dataUrl: any;
  extension: string;
}
