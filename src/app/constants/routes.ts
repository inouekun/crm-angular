export class Routes {
    static readonly Admin: RouteInfo[] = [
        {
            name: 'Dashboard',
            path: '', pathExact: true,
            icon: 'dashboard',
            breadcrumb: 'Home'
        },
        {
            name: 'User Registration',
            path: '/admin/register', pathExact: false,
            icon: 'person_add',
            breadcrumb: 'Home / User Registration'
        },
        {
            name: 'List of Users',
            path: '/admin/user-list', pathExact: false,
            icon: 'group',
            breadcrumb: 'Home / List of Users'
        }
    ];
    static readonly SuperAdmin: RouteInfo[] = [
        {
            name: 'Dashboard',
            path: '', pathExact: true,
            icon: 'dashboard',
            breadcrumb: 'Home'
        }
    ];
    static readonly CEO: RouteInfo[] = [
        {
            name: 'Dashboard',
            path: '', pathExact: true,
            icon: 'dashboard',
            breadcrumb: 'Home'
        },
        {
            name: 'Client Lists',
            path: '/client-list', pathExact: true,
            icon: 'group',
            breadcrumb: 'Home / Client Lists'
        }
    ];
    static readonly HOD: RouteInfo[] = [];
    static readonly SecretaryStaff: RouteInfo[] = [
        {
            name: 'Dashboard',
            path: '', pathExact: true,
            icon: 'dashboard',
            breadcrumb: 'Home'
        },
        {
            name: 'Client Lists',
            path: '/client-list', pathExact: true,
            icon: 'group',
            breadcrumb: 'Home / Client Lists'
        }
    ];
    static readonly AccountStaff: RouteInfo[] = [];
    static readonly AuditStaff: RouteInfo[] = [];
    static readonly TaxStaff: RouteInfo[] = [];
    static readonly Director: RouteInfo[] = [];
    static readonly SeniorStaff: RouteInfo[] = [];
}

export interface RouteInfo {
    name: string;
    path: string;
    pathExact: boolean;
    icon: string;
    breadcrumb: string;
}
