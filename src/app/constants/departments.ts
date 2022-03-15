import { RouteInfo, Routes } from './routes';

export class Departments {
    static readonly departments: Department[] = [
        {
            name: 'Technical',
            roles: [
                {
                    name: 'Super Admin',
                    code: 'super-admin',
                    menuPages: Routes.SuperAdmin
                }
            ]
        },
        {
            name: 'Management',
            roles: [
                {
                    name: 'CEO',
                    code: 'mgmt-ceo',
                    menuPages: Routes.CEO
                },
                {
                    name: 'Admin',
                    code: 'mgmt-admin',
                    menuPages: Routes.Admin
                }
            ]
        },
        {
            name: 'Secretary',
            roles: [
                {
                    name: 'HOD',
                    code: 'sec-hod',
                    menuPages: Routes.HOD
                },
                {
                    name: 'Staff',
                    code: 'sec-staff',
                    menuPages: Routes.SecretaryStaff
                }
            ]
        },
        {
            name: 'Account',
            roles: [
                {
                    name: 'Director',
                    code: 'acc-director',
                    menuPages: Routes.Director
                },
                {
                    name: 'HOD',
                    code: 'acc-hod',
                    menuPages: Routes.HOD
                },
                {
                    name: 'Staff',
                    code: 'acc-staff',
                    menuPages: Routes.AccountStaff
                }
            ]
        },
        {
            name: 'Audit',
            roles: [
                {
                    name: 'HOD',
                    code: 'aud-hod',
                    menuPages: Routes.HOD
                },
                {
                    name: 'Staff',
                    code: 'aud-staff',
                    menuPages: Routes.AuditStaff
                }
            ]
        },
        {
            name: 'Tax',
            roles: [
                {
                    name: 'HOD',
                    code: 'tax-hod',
                    menuPages: Routes.HOD
                },
                {
                    name: 'Senior Staff',
                    code: 'tax-senior',
                    menuPages: Routes.SeniorStaff
                },
                {
                    name: 'Staff',
                    code: 'tax-staff',
                    menuPages: Routes.TaxStaff
                }
            ]
        }
    ];

    static getDepartmentRoleDetails(roleCode: string) {
        for (let dept of Departments.departments) {
            for (let role of dept.roles) {
                if (role.code == roleCode) {
                    return {
                        roleName: role.name,
                        department: dept.name
                    }
                }
            }
        }
    }

    static getRolesFromDepartment(departmentName: string) {
        for (let dept of Departments.departments) {
            if (dept.name == departmentName) {
                return dept.roles;
            }

        }
    }
}

export interface Department {
    name: string;
    roles: Role[];
}

export interface Role {
    name: string;
    code: string;
    menuPages: RouteInfo[];
}
