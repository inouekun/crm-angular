import { ClientDataService } from './../../../services/data/client-data.service';
import { GetClientResponse, GetServiceResponse } from 'src/app/services/api/dto/clients';
import { ActivatedRoute } from "@angular/router";
import { ApiService } from "./../../../services/api/api.service";
import { Component, OnInit } from "@angular/core";

@Component({ selector: "app-client-profile", templateUrl: "./client-profile.component.html", styleUrls: ["./client-profile.component.scss"] })

export class ClientProfileComponent implements OnInit {

  routes: object[] = [
    {
      name: "Client Details",
      breadcrumb: "Home / Client Details"
    }
  ];

  tabLabelPersonal = [
    "Personal Overview",
    "Contact Details",
    "Tax"
  ];

  tabLabelCompany = [
    "Company Overview",
    "Contact Details",
    "Shareholders & Directors Information",
    "Important Date",
    "Resolutions",
    "Nature of Business & Memorandum",
    "Year of Lodgement",
    "Full Set Documents"
  ];

  clientId: string;

  clientType: string;

  clientDetailsData: GetClientResponse = {
    id: "",
    name: "",
    employerNo: "",
    businessType: "",
    incomeTaxNo: "",
    taxPayerInfo: "",
    contactNo: "",
    contactPerson: "",
    email: "",
    remarks: "",
    lastTaxSubmittedYear: null,
    lastTaxSubmittedDate: null,
    personalDetails: {
      id: "",
      icNo: "",
      clientId: "",
    },
    companyDetails: {
      id: "",
      companyNo: "",
      businessAddrLine1: "",
      businessAddrLine2: "",
      businessAddrCity: "",
      businessAddrPostCode: "",
      businessAddrState: "",
      incorporationDate: null,
      natureOfBusiness: "",
      annualYearEndDate: null,
      annualReturnsDate: null,
      agmDate: null,
      annualReturnsPaidDate: null,
      annualReturnsSubmittedDate: null,
      annualReturnsLastAuditedDate: null,
      financialStatementsPaidDate: null,
      financialStatementsSubmittedDate: null,
      lastAuditedReportDate: null,
      clientId: ""
    },
    postalAddrLine1: "",
    postalAddrLine2: "",
    postalAddrCity: "",
    postalAddrPostCode: "",
    postalAddrState: ""
  };

  loading: boolean = true;

  constructor(private api: ApiService, private route: ActivatedRoute, private clientData: ClientDataService) { }

  ngOnInit() {
    this.clientId = this.route.snapshot.paramMap.get("id");
    this.getClient();
    if (!this.clientDetailsData.companyDetails && this.clientDetailsData.personalDetails) {
      this.clientType = 'personal';
    } else if (this.clientDetailsData.companyDetails && !this.clientDetailsData.personalDetails) {
      this.clientType = 'company';
    }
    this.getServices();
  }

  getClient() {
    this.api.getClient(this.clientId).subscribe(res => {
      this.loading = false;
      console.log("SUCCESS: Client Details -> ", res);
      this.clientDetailsData = res;
      this.clientData.updateClientData(this.clientDetailsData);

      if(this.clientDetailsData.businessType == "enterprise")
        this.tabLabelCompany.push('Tax');
    }, err => {
      this.loading = false;
      console.log("FAILED: Client Details -> ", err);
    });
  }

  getServices() {


    this.api.getServicesSubscription(this.clientId).subscribe(
      res => {
        console.log("SUCCESS: Service subscription in Client Profile -> ", res);
        res.forEach(element => {
          switch (element.service) {
            case 'audit':
              this.tabLabelCompany.push('Audit');
              break;
            case 'tax':
              this.tabLabelCompany.push('Tax');
              break;
            case 'account':
              this.tabLabelCompany.push('Account');
              break;
            default:
              break;
          }
        });
      },
      err => {
        console.log("FAILED: Service subscription in Client Profile -> ", err);
      }
    );


  }

}
