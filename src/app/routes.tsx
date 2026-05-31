// Router Configuration - FIXED: Removed bad imports (Updated: 2026-03-26)
import React, { lazy, Suspense } from "react";
import { createHashRouter, Navigate, Outlet } from "react-router-dom";
import { GlobalFiltersProvider } from "./components/navigation/GlobalFilterBar";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { RootLayoutWrapper } from "./components/layouts/RootLayoutWrapper";

// Loading fallback for lazy-loaded routes
const PageLoader = () => (
  <div className="flex items-center justify-center h-64">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
  </div>
);

// Lazy-loaded heavy components for code splitting
const OnboardingPortal = lazy(() => import("./components/OnboardingPortal"));
const HRModule = lazy(() => import("./components/modules/HRModule"));
const ProfessionalLeaveManagement = lazy(() => import("./components/hr/ProfessionalLeaveManagement"));
const StatutoryFormsOnboarding = lazy(() => import("./components/hr/StatutoryFormsOnboarding"));
const TravelReimbursementModule = lazy(() => import("./components/travel/TravelReimbursementModule"));
const ChartOfAccounts = lazy(() => import("./components/finance/ChartOfAccounts"));
const AdminPlanManagement = lazy(() => import("./components/subscription/AdminPlanManagement"));
const IncentiveConfiguration = lazy(() => import("./components/incentives/IncentiveConfiguration"));

// Analytics module - all lazy loaded
const UnitEconomicsDashboard = lazy(() => import("./components/analytics/UnitEconomicsDashboard"));
const CustomerLTVAnalysis = lazy(() => import("./components/analytics/CustomerLTVAnalysis"));
const CACDashboard = lazy(() => import("./components/analytics/CACDashboard"));
const BreakEvenAnalysis = lazy(() => import("./components/analytics/BreakEvenAnalysis"));
const CostPerWashCalculatorEnhanced = lazy(() => import("./components/analytics/CostPerWashCalculatorEnhanced"));
const CostPerWashByPlan = lazy(() => import("./components/analytics/CostPerWashByPlan"));
const CostPerWashByConsumption = lazy(() => import("./components/analytics/CostPerWashByConsumption"));
const LabourCostPerWash = lazy(() => import("./components/analytics/LabourCostPerWash"));
const EmployeeEfficiency = lazy(() => import("./components/analytics/EmployeeEfficiency"));
const CityComparison = lazy(() => import("./components/analytics/CityComparison"));

// R3 FIX: Founder module properly lazy-loaded (was importing eagerly despite "NOW LAZY" comments)
const FounderControlTower  = lazy(() => import("./components/founder/FounderControlTower"));
const DetailedFinancialView = lazy(() => import("./components/founder/DetailedFinancialView"));
const CashFlowDashboard    = lazy(() => import("./components/founder/CashFlowDashboard"));
const MarketingROIDrilldown = lazy(() => import("./components/founder/MarketingROIDrilldown"));

// Keep these as regular imports (frequently accessed)
// import { OnboardingPortal } from "./components/OnboardingPortal"; // NOW LAZY
import { OnboardingRedirect } from "./components/onboarding/OnboardingRedirect";
import { DevOnlyRoute } from "./components/guards/DevOnlyRoute";
// import { ChartOfAccounts } from "./components/finance/ChartOfAccounts"; // NOW LAZY
// import { HRModule } from "./components/modules/HRModule"; // NOW LAZY
// import { ProfessionalLeaveManagement } from "./components/hr/ProfessionalLeaveManagement"; // NOW LAZY
// import { StatutoryFormsOnboarding } from "./components/hr/StatutoryFormsOnboarding"; // NOW LAZY
// Phase 1 Accounting Entry System
const TDSPayableModule = lazy(() => import("./components/accounts/TDSPayableModule"));
const AdvanceTaxCalculator = lazy(() => import("./components/accounts/AdvanceTaxCalculator"));
const PayablesDashboard = lazy(() => import("./components/accounts/PayablesDashboard"));
// Phase 3 Accounting Reports
// Analytics imports - NOW LAZY
// import { UnitEconomicsDashboard } from "./components/analytics/UnitEconomicsDashboard"; // NOW LAZY
// import { CustomerLTVAnalysis } from "./components/analytics/CustomerLTVAnalysis"; // NOW LAZY
// import { CACDashboard } from "./components/analytics/CACDashboard"; // NOW LAZY
// import { BreakEvenAnalysis } from "./components/analytics/BreakEvenAnalysis"; // NOW LAZY
// import { CostPerWashCalculatorEnhanced } from "./components/analytics/CostPerWashCalculatorEnhanced"; // NOW LAZY
// import { CostPerWashByPlan } from "./components/analytics/CostPerWashByPlan"; // NOW LAZY
// import { CostPerWashByConsumption } from "./components/analytics/CostPerWashByConsumption"; // NOW LAZY
// import { LabourCostPerWash } from "./components/analytics/LabourCostPerWash"; // NOW LAZY
// import { EmployeeEfficiency } from "./components/analytics/EmployeeEfficiency"; // NOW LAZY
// import { CityComparison } from "./components/analytics/CityComparison"; // NOW LAZY
// Founder module imports - NOW LAZY
// import { FounderControlTower } from "./components/founder/FounderControlTower"; // NOW LAZY
// import { DetailedFinancialView } from "./components/founder/DetailedFinancialView"; // NOW LAZY
// import { CashFlowDashboard } from "./components/founder/CashFlowDashboard"; // NOW LAZY
// import { MarketingROIDrilldown } from "./components/founder/MarketingROIDrilldown"; // NOW LAZY
// import { CreateSalaryStructure } from "./components/payroll/CreateSalaryStructure"; // NOW LAZY
// R2 FIX: test-btl-service file may not exist — converted to lazy with error boundary
// import { AdminPlanManagement } from "./components/subscription/AdminPlanManagement"; // NOW LAZY
// import { IncentiveConfiguration } from "./components/incentives/IncentiveConfiguration"; // NOW LAZY

// Lazy-loaded components
const CreateSalaryStructure = lazy(() => import("./components/payroll/CreateSalaryStructure"));
const Dashboard = lazy(() => import("./components/Dashboard").then(m => ({default: m.Dashboard || m.default})));
const UserManagement = lazy(() => import("./components/modules/UserManagement").then(m => ({default: m.UserManagement || m.default})));
const CRMLeadManagementWithFilters = lazy(() => import("./components/modules/CRMLeadManagementWithFilters").then(m => ({default: m.CRMLeadManagementWithFilters || m.default})));
const CRMConversionAnalyticsDashboard = lazy(() => import("./components/modules/CRMConversionAnalyticsDashboard").then(m => ({default: m.CRMConversionAnalyticsDashboard || m.default})));
const CustomerSubscription = lazy(() => import("./components/modules/CustomerSubscription").then(m => ({default: m.CustomerSubscription || m.default})));
const SupervisorModuleUpdated = lazy(() => import("./components/modules/SupervisorModuleUpdated").then(m => ({default: m.SupervisorModuleUpdated || m.default})));
const OperationsManagerApp = lazy(() => import("./components/om/OperationsManagerApp").then(m => ({default: m.OperationsManagerApp || m.default})));
const ComplaintManagement = lazy(() => import("./components/modules/ComplaintManagement").then(m => ({default: m.ComplaintManagement || m.default})));
const InventoryStore = lazy(() => import("./components/modules/InventoryStore").then(m => ({default: m.InventoryStore || m.default})));
const MaterialRequisition = lazy(() => import("./components/inventory/MaterialRequisition").then(m => ({default: m.MaterialRequisition || m.default})));
const WasherIssuances = lazy(() => import("./components/inventory/WasherIssuances").then(m => ({default: m.WasherIssuances || m.default})));
const WasherStockLedger = lazy(() => import("./components/inventory/WasherStockLedger").then(m => ({default: m.WasherStockLedger || m.default})));
const MonthEndVerification = lazy(() => import("./components/inventory/MonthEndVerification").then(m => ({default: m.MonthEndVerification || m.default})));
const MyStock = lazy(() => import("./components/washer/MyStock").then(m => ({default: m.MyStock || m.default})));
const StoreModule = lazy(() => import("./components/modules/StoreModule").then(m => ({default: m.StoreModule || m.default})));
const ProcurementModule = lazy(() => import("./components/modules/ProcurementModule").then(m => ({default: m.ProcurementModule || m.default})));
const FinanceModule = lazy(() => import("./components/modules/FinanceModule").then(m => ({default: m.FinanceModule || m.default})));
const RevenueCaptureSystem = lazy(() => import("./components/finance/RevenueCaptureSystem").then(m => ({default: m.RevenueCaptureSystem || m.default})));
const PackageCostMatrix = lazy(() => import("./components/finance/PackageCostMatrix").then(m => ({default: m.PackageCostMatrix || m.default})));
const CostPerWashModule = lazy(() => import("./components/finance/CostPerWashModule").then(m => ({default: m.CostPerWashModule || m.default})));
const ActualCostInputs = lazy(() => import("./components/finance/ActualCostInputs").then(m => ({default: m.ActualCostInputs || m.default})));
const FinanceTransactions = lazy(() => import("./components/finance/FinanceTransactions").then(m => ({default: m.FinanceTransactions || m.default})));
const LedgerEntriesView = lazy(() => import("./components/finance/LedgerEntriesView").then(m => ({default: m.LedgerEntriesView || m.default})));
const FinanceAnalyticsDashboard = lazy(() => import("./components/finance/FinanceAnalyticsDashboard").then(m => ({default: m.FinanceAnalyticsDashboard || m.default})));
const FinancialReportsModule = lazy(() => import("./components/finance/FinancialReportsModule").then(m => ({default: m.FinancialReportsModule || m.default})));
const InvoiceManagement = lazy(() => import("./components/finance/InvoiceManagement"));
const InvoiceDetail = lazy(() => import("./components/finance/InvoiceDetail"));
const PaymentManagement = lazy(() => import("./components/finance/PaymentManagement"));
const LeavePolicyEngine = lazy(() => import("./components/hr/LeavePolicyEngine").then(m => ({default: m.LeavePolicyEngine || m.default})));
const EmployeeOnboarding = lazy(() => import("./components/hr/EmployeeOnboarding").then(m => ({default: m.EmployeeOnboarding || m.default})));
const ExitFFSettlement = lazy(() => import("./components/hr/ExitFFSettlement").then(m => ({default: m.ExitFFSettlement || m.default})));
const EmployeeLifecycleManagement = lazy(() => import("./components/hr/EmployeeLifecycleManagement").then(m => ({default: m.EmployeeLifecycleManagement || m.default})));
const LettersDocuments = lazy(() => import("./components/hr/LettersDocuments").then(m => ({default: m.LettersDocuments || m.default})));
const IDCardGenerator = lazy(() => import("./components/hr/IDCardGenerator").then(m => ({default: m.IDCardGenerator || m.default})));
const HolidayManagement = lazy(() => import("./components/hr/HolidayManagement").then(m => ({default: m.HolidayManagement || m.default})));
const LifeCycleReports = lazy(() => import("./components/hr/LifeCycleReports").then(m => ({default: m.LifeCycleReports || m.default})));
const EmployeeLedger = lazy(() => import("./components/hr/EmployeeLedger").then(m => ({default: m.EmployeeLedger || m.default})));
const StatutoryFormsVerification = lazy(() => import("./components/hr/StatutoryFormsVerification").then(m => ({default: m.StatutoryFormsVerification || m.default})));
const OnboardingAutomation = lazy(() => import("./components/hr/OnboardingAutomation").then(m => ({default: m.OnboardingAutomation || m.default})));
const EmployeeSalaryAssignment = lazy(() => import("./components/payroll/EmployeeSalaryAssignment").then(m => ({default: m.EmployeeSalaryAssignment || m.default})));
const EmployeeSelfService = lazy(() => import("./components/hr/EmployeeSelfService").then(m => ({default: m.EmployeeSelfService || m.default})));
const AttendanceDataManager = lazy(() => import("./components/admin/AttendanceDataManager").then(m => ({default: m.AttendanceDataManager || m.default})));
const ApprovalCenter as ApprovalCenterHR = lazy(() => import("./components/hr/ApprovalCenter").then(m => ({default: m.ApprovalCenter as ApprovalCenterHR || m.default})));
const TestStatutoryRoutes = lazy(() => import("./components/TestStatutoryRoutes").then(m => ({default: m.TestStatutoryRoutes || m.default})));
const DeveloperRouteDirectory = lazy(() => import("./components/developer/DeveloperRouteDirectory").then(m => ({default: m.DeveloperRouteDirectory || m.default})));
const ApprovalCenter = lazy(() => import("./components/ApprovalCenter").then(m => ({default: m.ApprovalCenter || m.default})));
const AuditTrail = lazy(() => import("./components/AuditTrail").then(m => ({default: m.AuditTrail || m.default})));
const SystemAuditDashboard = lazy(() => import("./components/audit/SystemAuditDashboard").then(m => ({default: m.SystemAuditDashboard || m.default})));
const PerformanceTracking = lazy(() => import("./components/performance/PerformanceTracking").then(m => ({default: m.PerformanceTracking || m.default})));
const AccountsModule = lazy(() => import("./components/modules/AccountsModule").then(m => ({default: m.AccountsModule || m.default})));
const ExpenseEntry = lazy(() => import("./components/accounts/ExpenseEntry").then(m => ({default: m.ExpenseEntry || m.default})));
const ExpenseAnalytics = lazy(() => import("./components/accounts/ExpenseAnalytics").then(m => ({default: m.ExpenseAnalytics || m.default})));
const VendorPayment = lazy(() => import("./components/accounts/VendorPayment").then(m => ({default: m.VendorPayment || m.default})));
const GSTDashboard = lazy(() => import("./components/accounts/GSTDashboard").then(m => ({default: m.GSTDashboard || m.default})));
const AccountingEntry = lazy(() => import("./components/accounts/AccountingEntry").then(m => ({default: m.AccountingEntry || m.default})));
const JournalEntry = lazy(() => import("./components/accounts/JournalEntry").then(m => ({default: m.JournalEntry || m.default})));
const AccountsDashboard = lazy(() => import("./components/accounts/AccountsDashboard").then(m => ({default: m.AccountsDashboard || m.default})));
const AccountingTransactionList = lazy(() => import("./components/accounts/AccountingTransactionList").then(m => ({default: m.AccountingTransactionList || m.default})));
const AccountsLedger = lazy(() => import("./components/accounts/AccountsLedger").then(m => ({default: m.AccountsLedger || m.default})));
const PartyLedger = lazy(() => import("./components/accounts/PartyLedger").then(m => ({default: m.PartyLedger || m.default})));
const TrialBalance = lazy(() => import("./components/accounts/TrialBalance").then(m => ({default: m.TrialBalance || m.default})));
const BalanceSheet = lazy(() => import("./components/accounts/BalanceSheet").then(m => ({default: m.BalanceSheet || m.default})));
const LedgerMaster = lazy(() => import("./components/accounts/LedgerMaster").then(m => ({default: m.LedgerMaster || m.default})));
const RazorpayFlow = lazy(() => import("./components/accounts/RazorpayFlow").then(m => ({default: m.RazorpayFlow || m.default})));
const ExpenseVoucher = lazy(() => import("./components/accounts/ExpenseVoucher").then(m => ({default: m.ExpenseVoucher || m.default})));
const ItemMaster = lazy(() => import("./components/accounts/ItemMaster").then(m => ({default: m.ItemMaster || m.default})));
const GSTR2AReport = lazy(() => import("./components/accounts/GSTR2AReport").then(m => ({default: m.GSTR2AReport || m.default})));
const PurchaseSummaryReport = lazy(() => import("./components/accounts/PurchaseSummaryReport").then(m => ({default: m.PurchaseSummaryReport || m.default})));
const SalesSummaryReport = lazy(() => import("./components/accounts/SalesSummaryReport").then(m => ({default: m.SalesSummaryReport || m.default})));
const RCMReport = lazy(() => import("./components/accounts/RCMReport").then(m => ({default: m.RCMReport || m.default})));
const StoreManagerModule = lazy(() => import("./components/modules/StoreManagerModule").then(m => ({default: m.StoreManagerModule || m.default})));
const GRNEntry = lazy(() => import("./components/store-manager/GRNEntry").then(m => ({default: m.GRNEntry || m.default})));
const PurchaseOrderCreation = lazy(() => import("./components/store-manager/PurchaseOrderCreation").then(m => ({default: m.PurchaseOrderCreation || m.default})));
const MOQManagement = lazy(() => import("./components/store-manager/MOQManagement").then(m => ({default: m.MOQManagement || m.default})));
const InventoryMonitoring = lazy(() => import("./components/store-manager/InventoryMonitoring").then(m => ({default: m.InventoryMonitoring || m.default})));
const VendorRequest = lazy(() => import("./components/store-manager/VendorRequest").then(m => ({default: m.VendorRequest || m.default})));
const AnalyticsDashboardWithDrillDown = lazy(() => import("./components/dashboards/AnalyticsDashboardWithDrillDown").then(m => ({default: m.AnalyticsDashboardWithDrillDown || m.default})));
const RoleBasedAnalyticsDashboard = lazy(() => import("./components/examples/RoleBasedAnalyticsDashboard").then(m => ({default: m.RoleBasedAnalyticsDashboard || m.default})));
const CostPerWashReport = lazy(() => import("./components/reports/CostPerWashReport").then(m => ({default: m.CostPerWashReport || m.default})));
const ActivityTimelineWrapper = lazy(() => import("./components/crm/ActivityTimelineWrapper").then(m => ({default: m.ActivityTimelineWrapper || m.default})));
const NotificationCenter = lazy(() => import("./components/crm/NotificationCenter").then(m => ({default: m.NotificationCenter || m.default})));
const PayrollConfiguration = lazy(() => import("./components/payroll/PayrollConfiguration").then(m => ({default: m.PayrollConfiguration || m.default})));
const PayrollConfigTest = lazy(() => import("./components/payroll/PayrollConfigTest").then(m => ({default: m.PayrollConfigTest || m.default})));
const PayrollRun = lazy(() => import("./components/payroll/PayrollRun").then(m => ({default: m.PayrollRun || m.default})));
const PayrollProcessing = lazy(() => import("./components/payroll/PayrollProcessing").then(m => ({default: m.PayrollProcessing || m.default})));
const PayrollProcessingAdvanced = lazy(() => import("./components/payroll/PayrollProcessingAdvanced").then(m => ({default: m.PayrollProcessingAdvanced || m.default})));
const PayrollReviewApproval = lazy(() => import("./components/payroll/PayrollReviewApproval").then(m => ({default: m.PayrollReviewApproval || m.default})));
const SalaryPayableView = lazy(() => import("./components/payroll/SalaryPayableView").then(m => ({default: m.SalaryPayableView || m.default})));
const SalaryPaymentScreen = lazy(() => import("./components/payroll/SalaryPaymentScreen").then(m => ({default: m.SalaryPaymentScreen || m.default})));
const StatutoryPayablesScreen = lazy(() => import("./components/payroll/StatutoryPayablesScreen").then(m => ({default: m.StatutoryPayablesScreen || m.default})));
const PlanEditor = lazy(() => import("./components/subscription/PlanEditor").then(m => ({default: m.PlanEditor || m.default})));
const CommunicationTemplates = lazy(() => import("./components/settings/CommunicationTemplates").then(m => ({default: m.CommunicationTemplates || m.default})));
const CostConfiguration = lazy(() => import("./components/settings/CostConfiguration").then(m => ({default: m.CostConfiguration || m.default})));
const ServiceZonesManagement = lazy(() => import("./components/modules/ServiceZonesManagement").then(m => ({default: m.ServiceZonesManagement || m.default})));
const WasherJobExecution = lazy(() => import("./components/modules/WasherJobExecution").then(m => ({default: m.WasherJobExecution || m.default})));
const ExpansionOpportunities = lazy(() => import("./components/modules/ExpansionOpportunities").then(m => ({default: m.ExpansionOpportunities || m.default})));
const SupplierDetail = lazy(() => import("./components/procurement/SupplierDetail").then(m => ({default: m.SupplierDetail || m.default})));
const CostTrackingIntegrationDemo = lazy(() => import("./components/demo/CostTrackingIntegrationDemo").then(m => ({default: m.CostTrackingIntegrationDemo || m.default})));
const DesignSystemTest = lazy(() => import("./design-system/tests/DesignSystemTest").then(m => ({default: m.DesignSystemTest || m.default})));
const ClothExchange = lazy(() => import("./components/cloth-tracking/ClothExchange").then(m => ({default: m.ClothExchange || m.default})));
const ClothAdminDashboard = lazy(() => import("./components/cloth-tracking/ClothAdminDashboard").then(m => ({default: m.ClothAdminDashboard || m.default})));
const AdvanceTypeSelection = lazy(() => import("./components/advance/AdvanceTypeSelection").then(m => ({default: m.AdvanceTypeSelection || m.default})));
const LongTermAdvanceForm = lazy(() => import("./components/advance/LongTermAdvanceForm").then(m => ({default: m.LongTermAdvanceForm || m.default})));
const ShortTermAdvanceForm = lazy(() => import("./components/advance/ShortTermAdvanceForm").then(m => ({default: m.ShortTermAdvanceForm || m.default})));
const EmployeeAdvanceDashboard = lazy(() => import("./components/advance/EmployeeAdvanceDashboard").then(m => ({default: m.EmployeeAdvanceDashboard || m.default})));
const AdvanceDetailView = lazy(() => import("./components/advance/AdvanceDetailView").then(m => ({default: m.AdvanceDetailView || m.default})));
const HRAdvanceManagement = lazy(() => import("./components/advance/HRAdvanceManagement").then(m => ({default: m.HRAdvanceManagement || m.default})));
const OtherEarningsModule = lazy(() => import("./components/advance/OtherEarningsModule").then(m => ({default: m.OtherEarningsModule || m.default})));
const OtherDeductionsModule = lazy(() => import("./components/advance/OtherDeductionsModule").then(m => ({default: m.OtherDeductionsModule || m.default})));
const AdjustmentsReport = lazy(() => import("./components/advance/AdjustmentsReport").then(m => ({default: m.AdjustmentsReport || m.default})));
const WorkflowControlDemo = lazy(() => import("./components/workflow/WorkflowControlDemo").then(m => ({default: m.WorkflowControlDemo || m.default})));
const IncentiveEngineDemo = lazy(() => import("./components/workflow/IncentiveEngineDemo").then(m => ({default: m.IncentiveEngineDemo || m.default})));
const WeekOffCoverDemo = lazy(() => import("./components/washer/WeekOffCoverDemo").then(m => ({default: m.WeekOffCoverDemo || m.default})));
const SystemIntegrationDemo = lazy(() => import("./components/washer/SystemIntegrationDemo").then(m => ({default: m.SystemIntegrationDemo || m.default})));
const WasherCoreScreensDemo = lazy(() => import("./components/washer/WasherCoreScreensDemo").then(m => ({default: m.WasherCoreScreensDemo || m.default})));
const WasherCoreScreensConnected = lazy(() => import("./components/washer/WasherCoreScreensConnected").then(m => ({default: m.WasherCoreScreensConnected || m.default})));
const SupervisorAppConnected = lazy(() => import("./components/supervisor/SupervisorAppConnected").then(m => ({default: m.SupervisorAppConnected || m.default})));
const SupervisorLayout = lazy(() => import("./components/supervisor/SupervisorLayout").then(m => ({default: m.SupervisorLayout || m.default})));
const ClusterManagerApp = lazy(() => import("./components/cm/ClusterManagerApp").then(m => ({default: m.ClusterManagerApp || m.default})));
const CityManagerApp = lazy(() => import("./components/city/CityManagerApp").then(m => ({default: m.CityManagerApp || m.default})));
const TeleSalesManagerApp = lazy(() => import("./components/tsm/TeleSalesManagerApp").then(m => ({default: m.TeleSalesManagerApp || m.default})));
const SalesHeadApp = lazy(() => import("./components/sh/SalesHeadApp").then(m => ({default: m.SalesHeadApp || m.default})));
const SalesManagerApp = lazy(() => import("./components/sm/SalesManagerApp").then(m => ({default: m.SalesManagerApp || m.default})));
const TeleSalesExecutiveApp = lazy(() => import("./components/tse/TeleSalesExecutiveApp").then(m => ({default: m.TeleSalesExecutiveApp || m.default})));
const TSEDiagnostics = lazy(() => import("./components/tse/TSEDiagnostics").then(m => ({default: m.TSEDiagnostics || m.default})));
const CustomerCareExecutiveApp = lazy(() => import("./components/cce/CustomerCareExecutiveApp").then(m => ({default: m.CustomerCareExecutiveApp || m.default})));
const TestBTLService = lazy(() => import("./test-btl-service"));
const SubscriptionApp = lazy(() => import("./components/subscription/SubscriptionApp").then(m => ({default: m.SubscriptionApp || m.default})));
const PlanSelectionScreen = lazy(() => import("./components/subscription/PlanSelectionScreen").then(m => ({default: m.PlanSelectionScreen || m.default})));
const CustomerPlanPage = lazy(() => import("./components/subscription/CustomerPlanPage").then(m => ({default: m.CustomerPlanPage || m.default})));
const SuperAdminPlanEditor = lazy(() => import("./components/admin/SuperAdminPlanEditor").then(m => ({default: m.SuperAdminPlanEditor || m.default})));
const SubscriptionDiagnostics = lazy(() => import("./components/subscription/SubscriptionDiagnostics").then(m => ({default: m.SubscriptionDiagnostics || m.default})));
const HierarchyDashboard = lazy(() => import("./components/hierarchy/HierarchyDashboard").then(m => ({default: m.HierarchyDashboard || m.default})));
const WasherAttendanceHistory = lazy(() => import("./components/washer/WasherAttendanceHistory").then(m => ({default: m.WasherAttendanceHistory || m.default})));
const OperationsRouter = lazy(() => import("./components/operations/OperationsRouter").then(m => ({default: m.OperationsRouter || m.default})));
const OperationsDataCapture = lazy(() => import("./components/operations/OperationsDataCapture").then(m => ({default: m.OperationsDataCapture || m.default})));
const OperationsLayout = lazy(() => import("./components/operations/OperationsLayout").then(m => ({default: m.OperationsLayout || m.default})));
const ClientPortal = lazy(() => import("./components/client/ClientPortal").then(m => ({default: m.ClientPortal || m.default})));
const WorkingHoursSetup = lazy(() => import("./components/workforce/WorkingHoursSetup").then(m => ({default: m.WorkingHoursSetup || m.default})));
const WorkingHoursTest = lazy(() => import("./components/workforce/WorkingHoursTest").then(m => ({default: m.WorkingHoursTest || m.default})));
const WorkingHoursSimple = lazy(() => import("./components/workforce/WorkingHoursSimple").then(m => ({default: m.WorkingHoursSimple || m.default})));
const WorkforceDiagnostic = lazy(() => import("./components/workforce/WorkforceDiagnostic").then(m => ({default: m.WorkforceDiagnostic || m.default})));
const IncentiveSimulator = lazy(() => import("./components/incentives/IncentiveSimulator").then(m => ({default: m.IncentiveSimulator || m.default})));
const IncentiveDashboard = lazy(() => import("./components/incentives/IncentiveDashboard").then(m => ({default: m.IncentiveDashboard || m.default})));
const HRPayrollApproval = lazy(() => import("./components/hr/HRPayrollApproval").then(m => ({default: m.HRPayrollApproval || m.default})));
const SuperAdminPayrollApproval = lazy(() => import("./components/admin/SuperAdminPayrollApproval").then(m => ({default: m.SuperAdminPayrollApproval || m.default})));
const CityManagement = lazy(() => import("./components/admin/CityManagement").then(m => ({default: m.CityManagement || m.default})));
const BusinessRulesPage = lazy(() => import("./components/admin/BusinessRulesPage").then(m => ({default: m.BusinessRulesPage || m.default})));
const ShiftManagementPage = lazy(() => import("./components/admin/ShiftManagementPage").then(m => ({default: m.ShiftManagementPage || m.default})));
const AttendanceFraudAlertsPage = lazy(() => import("./components/admin/AttendanceFraudAlertsPage").then(m => ({default: m.AttendanceFraudAlertsPage || m.default})));
const PermissionManagementPage = lazy(() => import("./components/admin/PermissionManagementPage").then(m => ({default: m.PermissionManagementPage || m.default})));
const RolePermissionManager = lazy(() => import("./components/admin/RolePermissionManager").then(m => ({default: m.RolePermissionManager || m.default})));
const IncentiveVisibilityAdmin = lazy(() => import("./components/admin/IncentiveVisibilityAdmin").then(m => ({default: m.IncentiveVisibilityAdmin || m.default})));
const RoleSuggestionsPage = lazy(() => import("./components/hr/RoleSuggestionsPage").then(m => ({default: m.RoleSuggestionsPage || m.default})));
const HRIntelligenceDashboard = lazy(() => import("./components/hr/HRIntelligenceDashboard").then(m => ({default: m.HRIntelligenceDashboard || m.default})));
const AccountsPayrollProcessing = lazy(() => import("./components/accounts/AccountsPayrollProcessing").then(m => ({default: m.AccountsPayrollProcessing || m.default})));
const GSTOverview = lazy(() => import("./components/gst/GSTOverview").then(m => ({default: m.GSTOverview || m.default})));
const GSTVendorMaster = lazy(() => import("./components/gst/GSTVendorMaster").then(m => ({default: m.GSTVendorMaster || m.default})));
const GSTCustomerMaster = lazy(() => import("./components/gst/GSTCustomerMaster").then(m => ({default: m.GSTCustomerMaster || m.default})));
const GSTTransactionEntry = lazy(() => import("./components/gst/GSTTransactionEntry").then(m => ({default: m.GSTTransactionEntry || m.default})));
const GSTValidationCentre = lazy(() => import("./components/gst/GSTValidationCentre").then(m => ({default: m.GSTValidationCentre || m.default})));
const GSTManagerReview = lazy(() => import("./components/gst/GSTManagerReview").then(m => ({default: m.GSTManagerReview || m.default})));
const GSTReconciliation = lazy(() => import("./components/gst/GSTReconciliation").then(m => ({default: m.GSTReconciliation || m.default})));
const GSTReports = lazy(() => import("./components/gst/GSTReports").then(m => ({default: m.GSTReports || m.default})));
const TransactionSubTypeManager = lazy(() => import("./components/gst/TransactionSubTypeManager").then(m => ({default: m.TransactionSubTypeManager || m.default})));
const GSTR1Module = lazy(() => import("./components/gst/GSTR1Module").then(m => ({default: m.GSTR1Module || m.default})));
const GSTR3BModule = lazy(() => import("./components/gst/GSTR3BModule").then(m => ({default: m.GSTR3BModule || m.default})));
const GSTFilingModule = lazy(() => import("./components/gst/GSTFilingModule").then(m => ({default: m.GSTFilingModule || m.default})));
const GSTMonitoringModule = lazy(() => import("./components/gst/GSTMonitoringModule").then(m => ({default: m.GSTMonitoringModule || m.default})));
const BusinessFlowDemo = lazy(() => import("./components/BusinessFlowDemo").then(m => ({default: m.BusinessFlowDemo || m.default})));
const UnauthorizedPage = lazy(() => import("./components/pages/UnauthorizedPage").then(m => ({default: m.UnauthorizedPage || m.default})));
const LoginPage = lazy(() => import("./pages/LoginPage").then(m => ({default: m.LoginPage || m.default})));
const MobileChangeRequest = lazy(() => import("./components/hr/MobileChangeRequest").then(m => ({default: m.MobileChangeRequest || m.default})));
const MyAccountPage = lazy(() => import("./components/hr/MyAccountPage").then(m => ({default: m.MyAccountPage || m.default})));


export const router = createHashRouter([
  {
    path: "/login",
    element: <LoginPage />,
  },
  // Standalone Onboarding Portal routes (no header/sidebar) - MUST come FIRST
  {
    path: "/onboarding/:empId",
    element: <ErrorBoundary><Suspense fallback={<PageLoader />}><OnboardingPortal /></Suspense></ErrorBoundary>,
  },
  {
    path: "/onboard/:empId",
    element: <OnboardingRedirect />,
  },
  // Main application routes with layout
  {
    path: "/",
    element: <RootLayoutWrapper />,
    errorElement: (<div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 gap-4 p-8"><div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center"><span className="text-red-600 text-xl font-bold">!</span></div><h2 className="text-lg font-semibold text-gray-900">Page Error</h2><p className="text-sm text-gray-500">This page has an error. Other pages still work.</p><a href="/" className="px-6 py-2 bg-blue-600 text-white rounded-lg text-sm">Go to Dashboard</a></div>),
    children: [
      { index: true, element: <Dashboard /> },

      // CRM index — nav parent /crm has no route
      {
        path: "crm",
        element: <Navigate to="/leads" replace />
      },

      // Payroll index — nav parent /payroll has no route
      {
        path: "payroll",
        element: <Navigate to="/payroll/run" replace />
      },

      // Admin index — nav parent /admin has no route
      {
        path: "admin",
        element: <Navigate to="/admin/city-management" replace />
      },

      // Reports index — nav parent /reports has no route
      {
        path: "reports",
        element: <Navigate to="/finance/reports" replace />
      },

      // Operations-management — the Operations nav section points here but route doesn't exist
      {
        path: "operations-management",
        element: <Navigate to="/operations" replace />
      },

      { path: "business-flow-demo", element: <DevOnlyRoute element={<BusinessFlowDemo />} /> },
      { path: "users", element: <UserManagement /> },
      { path: "leads", element: <CRMLeadManagementWithFilters /> },
      { path: "customers", element: <CustomerSubscription /> },
      { path: "car-washer", element: <Navigate to="/washer-core-screens" replace /> },
      { path: "supervisor", element: <SupervisorModuleUpdated /> },
      // Operations layout route with children
      {
        path: "operations",
        element: <OperationsLayout />,
        children: [
          { index: true, element: <OperationsRouter /> },
          { path: "data-capture", element: <OperationsDataCapture /> },
        ]
      },
      { path: "complaints", element: <ComplaintManagement /> },
      { path: "inventory", element: <InventoryStore /> },
      { path: "inventory/requisition", element: <MaterialRequisition /> },
      { path: "inventory/washer-issuances", element: <WasherIssuances /> },
      { path: "inventory/washer-stock-ledger", element: <WasherStockLedger /> },
      { path: "inventory/month-end-verification", element: <MonthEndVerification /> },
      { path: "inventory/my-stock", element: <MyStock /> },
      { path: "store", element: <StoreModule /> },
      { path: "procurement", element: <ProcurementModule /> },
      { path: "finance", element: <FinanceModule /> },
      { path: "finance/analytics", element: <FinanceAnalyticsDashboard /> },
      { path: "finance/reports", element: <FinancialReportsModule /> },
      { path: "finance/transactions", element: <FinanceTransactions /> },
      { path: "finance/ledger-entries", element: <LedgerEntriesView /> },
      { path: "finance/chart-of-accounts", element: <ErrorBoundary><Suspense fallback={<PageLoader />}><ChartOfAccounts /></Suspense></ErrorBoundary> },
      { path: "finance/invoices", element: <InvoiceManagement /> },
      { path: "finance/invoices/:id", element: <InvoiceDetail /> },
      { path: "finance/payments", element: <PaymentManagement /> },
      { path: "finance/revenue-capture", element: <RevenueCaptureSystem /> },
      { path: "finance/package-cost-matrix", element: <PackageCostMatrix /> },
      { path: "finance/cost-per-wash", element: <CostPerWashModule /> },
      { path: "finance/cost-per-wash/actual-inputs", element: <ActualCostInputs /> },
      { path: "hr", element: <ErrorBoundary><Suspense fallback={<PageLoader />}><HRModule /></Suspense></ErrorBoundary> },
      { path: "hr/leave", element: <Navigate to="/hr/professional-leave" replace /> },
      { path: "hr/enhanced-leave", element: <Navigate to="/hr/professional-leave" replace /> },
      { path: "hr/professional-leave", element: <ErrorBoundary><Suspense fallback={<PageLoader />}><ProfessionalLeaveManagement /></Suspense></ErrorBoundary> },
      { path: "hr/leave-policy-engine", element: <LeavePolicyEngine /> },
      { path: "hr/onboarding", element: <EmployeeOnboarding /> },
      { path: "hr/exit-settlement", element: <ExitFFSettlement /> },
      { path: "hr/lifecycle-management", element: <EmployeeLifecycleManagement /> },
      { path: "hr/letters-documents", element: <LettersDocuments /> },
      { path: "hr/id-card-generator", element: <IDCardGenerator /> },
      { path: "hr/holiday-management", element: <HolidayManagement /> },
      { path: "hr/lifecycle-reports", element: <LifeCycleReports /> },
      { path: "hr/employee-ledger", element: <EmployeeLedger /> },
      { path: "hr/statutory-forms-onboarding", element: <ErrorBoundary><Suspense fallback={<PageLoader />}><StatutoryFormsOnboarding /></Suspense></ErrorBoundary> },
      { path: "hr/statutory-forms-verification", element: <StatutoryFormsVerification /> },
      { path: "hr/onboarding-automation", element: <OnboardingAutomation /> },
      { path: "hr/self-service", element: <EmployeeSelfService /> },
      { path: "hr/approval-center", element: <ApprovalCenterHR /> },
      { path: "hr/payroll-approval", element: <HRPayrollApproval /> },
      { path: "hr/attendance-data-manager", element: <AttendanceDataManager /> },
      { path: "hr/test-statutory-routes", element: <DevOnlyRoute element={<TestStatutoryRoutes />} /> },
      { path: "hr/developer-routes", element: <DevOnlyRoute element={<DeveloperRouteDirectory />} /> },
      { path: "approvals", element: <ApprovalCenter /> },
      { path: "audit-trail", element: <AuditTrail /> },
      { path: "system-audit", element: <DevOnlyRoute element={<SystemAuditDashboard />} /> },
      { path: "performance", element: <PerformanceTracking /> },
      { path: "accounts", element: <AccountsModule /> },
      { path: "accounts/expense-entry", element: <ExpenseEntry /> },
      { path: "accounts/expense-analytics", element: <ExpenseAnalytics /> },
      { path: "accounts/vendor-payment", element: <VendorPayment /> },
      { path: "accounts/gst-dashboard", element: <GSTDashboard /> },
      { path: "accounts/gst-sub-types", element: <TransactionSubTypeManager /> },
      { path: "accounts/payroll-processing", element: <AccountsPayrollProcessing /> },
      { path: "accounts/accounting-entry", element: <AccountingEntry /> },
      { path: "accounts/expense-voucher", element: <ExpenseVoucher /> },
      { path: "accounts/item-master", element: <ItemMaster /> },
      { path: "accounts/payables", element: <ErrorBoundary><Suspense fallback={<PageLoader />}><PayablesDashboard /></Suspense></ErrorBoundary> },
      { path: "accounts/tds-payable", element: <ErrorBoundary><Suspense fallback={<PageLoader />}><TDSPayableModule /></Suspense></ErrorBoundary> },
      { path: "accounts/advance-tax", element: <ErrorBoundary><Suspense fallback={<PageLoader />}><AdvanceTaxCalculator /></Suspense></ErrorBoundary> },
      { path: "accounts/journal-entry", element: <JournalEntry /> },
      { path: "accounts/dashboard", element: <AccountsDashboard /> },
      { path: "accounts/transactions", element: <AccountingTransactionList /> },
      { path: "accounts/ledger", element: <AccountsLedger /> },
      { path: "accounts/party-ledger", element: <PartyLedger /> },
      { path: "accounts/ledger-master", element: <LedgerMaster /> },
      { path: "accounts/razorpay-flow", element: <RazorpayFlow /> },
      { path: "accounts/trial-balance", element: <TrialBalance /> },
      { path: "accounts/balance-sheet", element: <BalanceSheet /> },
      { path: "accounts/gstr2a", element: <GSTR2AReport /> },
      { path: "accounts/reports/purchase", element: <PurchaseSummaryReport /> },
      { path: "accounts/reports/sales", element: <SalesSummaryReport /> },
      { path: "accounts/reports/rcm", element: <RCMReport /> },
      { path: "gst", element: <GSTOverview /> },
      { path: "gst/vendors", element: <GSTVendorMaster /> },
      { path: "gst/customers", element: <GSTCustomerMaster /> },
      { path: "gst/transactions", element: <GSTTransactionEntry /> },
      { path: "gst/validation", element: <GSTValidationCentre /> },
      { path: "gst/review", element: <GSTManagerReview /> },
      { path: "gst/reconciliation", element: <GSTReconciliation /> },
      { path: "gst/reports", element: <GSTReports /> },
      { path: "gst/gstr1", element: <GSTR1Module /> },
      { path: "gst/gstr3b", element: <GSTR3BModule /> },
      { path: "gst/filing", element: <GSTFilingModule /> },
      { path: "gst/monitoring", element: <GSTMonitoringModule /> },
      { path: "admin/payroll-approval", element: <SuperAdminPayrollApproval /> },
      { path: "admin/city-management", element: <CityManagement /> },
      { path: "admin/business-rules", element: <BusinessRulesPage /> },
      { path: "admin/shift-management", element: <ShiftManagementPage /> }, // MC-10
      { path: "admin/fraud-alerts", element: <AttendanceFraudAlertsPage /> }, // MC-09
      { path: "admin/permissions", element: <PermissionManagementPage /> }, // MC-11
      { path: "admin/role-permissions", element: <RolePermissionManager /> }, // MC-11 Enhanced: Base role overrides + custom sub-roles
      { path: "admin/incentive-visibility", element: <IncentiveVisibilityAdmin /> }, // Super Admin: show/hide incentive tab per role/employee
      { path: "hr/role-suggestions", element: <RoleSuggestionsPage /> }, // MC-12
      { path: "hr/intelligence-dashboard", element: <HRIntelligenceDashboard /> },
      { path: "store-manager", element: <StoreManagerModule /> },
      { path: "store-manager/grn-entry", element: <GRNEntry /> },
      { path: "store-manager/purchase-order", element: <PurchaseOrderCreation /> },
      { path: "store-manager/moq", element: <MOQManagement /> },
      { path: "store-manager/inventory", element: <InventoryMonitoring /> },
      { path: "store-manager/vendor-request", element: <VendorRequest /> },
      {
        path: "analytics",
        element: <GlobalFiltersProvider><Outlet /></GlobalFiltersProvider>,
        children: [
          { index: true, element: <Navigate to="/analytics/dashboard" replace /> },
          { path: "dashboard", element: <AnalyticsDashboardWithDrillDown /> },
          { path: "unit-economics", element: <ErrorBoundary><Suspense fallback={<PageLoader />}><UnitEconomicsDashboard /></Suspense></ErrorBoundary> },
          { path: "customer-ltv", element: <ErrorBoundary><Suspense fallback={<PageLoader />}><CustomerLTVAnalysis /></Suspense></ErrorBoundary> },
          { path: "cac", element: <ErrorBoundary><Suspense fallback={<PageLoader />}><CACDashboard /></Suspense></ErrorBoundary> },
          { path: "break-even", element: <ErrorBoundary><Suspense fallback={<PageLoader />}><BreakEvenAnalysis /></Suspense></ErrorBoundary> },
          { path: "package-cost-matrix", element: <Navigate to="/finance/package-cost-matrix" replace /> },

          // PHASE 3: Consolidated Cost Module Routes
          // Main dashboard: /finance/cost-per-wash (CostPerWashModule)
          // Specialized views:
          { path: "cost-by-plan", element: <ErrorBoundary><Suspense fallback={<PageLoader />}><CostPerWashByPlan /></Suspense></ErrorBoundary> },
          { path: "cost-by-consumption", element: <ErrorBoundary><Suspense fallback={<PageLoader />}><CostPerWashByConsumption /></Suspense></ErrorBoundary> },
          { path: "labour-cost", element: <ErrorBoundary><Suspense fallback={<PageLoader />}><LabourCostPerWash /></Suspense></ErrorBoundary> },
          { path: "cost-report", element: <CostPerWashReport /> },

          // Legacy redirects for backward compatibility
          { path: "cost-per-wash", element: <Navigate to="/finance/cost-per-wash" replace /> },
          // R4 FIX: /unit-economics/ doesn't exist in route tree — removed
          { path: "cost-per-wash-by-plan", element: <Navigate to="/analytics/cost-by-plan" replace /> },
          { path: "cost-per-wash-by-consumption", element: <Navigate to="/analytics/cost-by-consumption" replace /> },
          { path: "labour-cost-per-wash", element: <Navigate to="/analytics/labour-cost" replace /> },
          { path: "cost-per-wash-report", element: <Navigate to="/analytics/cost-report" replace /> },

          { path: "employee-efficiency", element: <ErrorBoundary><Suspense fallback={<PageLoader />}><EmployeeEfficiency /></Suspense></ErrorBoundary> },
          { path: "city-comparison", element: <ErrorBoundary><Suspense fallback={<PageLoader />}><CityComparison /></Suspense></ErrorBoundary> },
          { path: "role-based-demo", element: <DevOnlyRoute element={<RoleBasedAnalyticsDashboard />} /> },
        ]
      },
      { path: "founder/control-tower", element: <ErrorBoundary><Suspense fallback={<PageLoader />}><FounderControlTower /></Suspense></ErrorBoundary> },
      { path: "founder/financial-view", element: <ErrorBoundary><Suspense fallback={<PageLoader />}><DetailedFinancialView /></Suspense></ErrorBoundary> },
      { path: "founder/cash-flow", element: <ErrorBoundary><Suspense fallback={<PageLoader />}><CashFlowDashboard /></Suspense></ErrorBoundary> },
      { path: "founder/marketing-roi", element: <ErrorBoundary><Suspense fallback={<PageLoader />}><MarketingROIDrilldown /></Suspense></ErrorBoundary> },
      { path: "crm/activity-timeline", element: <ActivityTimelineWrapper /> },
      { path: "crm/notifications", element: <NotificationCenter /> },
      { path: "crm/conversion-analytics", element: <CRMConversionAnalyticsDashboard /> },
      { path: "payroll/test", element: <DevOnlyRoute element={<PayrollConfigTest />} /> },
      { path: "payroll/configuration", element: <PayrollConfiguration /> },
      { path: "payroll/create-salary-structure", element: <CreateSalaryStructure /> },
      { path: "payroll/salary-assignment", element: <EmployeeSalaryAssignment /> },
      { path: "payroll/run", element: <PayrollRun /> },
      { path: "payroll/processing", element: <Navigate to="/payroll/run" replace /> },
      { path: "payroll/processing-basic", element: <Navigate to="/payroll/run" replace /> },
      { path: "payroll/review-approval", element: <PayrollReviewApproval /> },
      { path: "payroll/salary-payables", element: <SalaryPayableView /> },
      { path: "payroll/salary-payment", element: <SalaryPaymentScreen /> },
      { path: "payroll/statutory-payables", element: <StatutoryPayablesScreen /> },
      {
        path: "subscription",
        element: <Outlet />,
        children: [
          { index: true, element: <Navigate to="/subscription/plan-management" replace /> },
          { path: "plan-management", element: <ErrorBoundary><Suspense fallback={<PageLoader />}><AdminPlanManagement userRole="ADMIN" /></Suspense></ErrorBoundary> },
          { path: "plan-editor", element: <PlanEditor /> },
        ]
      },
      { path: "settings/communication-templates", element: <CommunicationTemplates /> },
      { path: "settings/cost-configuration", element: <CostConfiguration /> },
      { path: "service-zones", element: <ServiceZonesManagement /> },
      { path: "washer-jobs", element: <WasherJobExecution /> },
      { path: "expansion-opportunities", element: <ExpansionOpportunities /> },
      { path: "procurement/supplier/:supplierId", element: <SupplierDetail /> },
      { path: "demo/cost-tracking-integration", element: <DevOnlyRoute element={<CostTrackingIntegrationDemo />} /> },
      { path: "design-system-test", element: <DevOnlyRoute element={<DesignSystemTest />} /> },
      // Cloth Tracking System
      { path: "cloth-tracking/exchange", element: <ClothExchange /> },
      { path: "cloth-tracking/admin", element: <ClothAdminDashboard /> },
      // Advance Management System
      { path: "advance", element: <AdvanceTypeSelection /> },
      { path: "advance/long-term/apply", element: <LongTermAdvanceForm /> },
      { path: "advance/short-term/apply", element: <ShortTermAdvanceForm /> },
      { path: "advance/my-advances", element: <EmployeeAdvanceDashboard /> },
      { path: "advance/status/:advanceId", element: <AdvanceDetailView /> },
      { path: "advance/hr-management", element: <HRAdvanceManagement /> },
      { path: "advance/other-earnings", element: <OtherEarningsModule /> },
      { path: "advance/other-deductions", element: <OtherDeductionsModule /> },
      { path: "advance/adjustments-report", element: <AdjustmentsReport /> },
      // Travel Reimbursement
      { path: "travel", element: <ErrorBoundary><Suspense fallback={<PageLoader />}><TravelReimbursementModule /></Suspense></ErrorBoundary> },

      // Workflow Control & Incentive Engine
      { path: "workflow-demo", element: <DevOnlyRoute element={<WorkflowControlDemo />} /> },
      { path: "incentive-demo", element: <DevOnlyRoute element={<IncentiveEngineDemo />} /> },

      // Week-Off & Cover Job System
      { path: "weekoff-cover-demo", element: <DevOnlyRoute element={<WeekOffCoverDemo />} /> },

      // System Integration Demo
      { path: "system-integration-demo", element: <DevOnlyRoute element={<SystemIntegrationDemo />} /> },

      // Washer Core Screens Demo
      { path: "washer-core-screens-demo", element: <DevOnlyRoute element={<WasherCoreScreensDemo />} /> },
      
      // Washer Core Screens Connected (Production)
      { path: "washer-core-screens", element: <WasherCoreScreensConnected /> },

      // Washer Attendance History
      { path: "washer/attendance", element: <WasherAttendanceHistory /> },
      { path: "washer/check-in", element: <Navigate to="/washer-core-screens" replace /> },
      { path: "washer/schedule", element: <Navigate to="/washer-core-screens" replace /> },
      { path: "washer/earnings", element: <Navigate to="/washer-core-screens" replace /> },
      { path: "washer/raise-issue", element: <Navigate to="/washer-core-screens" replace /> },
      { path: "finance/collections", element: <FinanceTransactions /> },

      // Supervisor App - Nested routes with layout
      {
        path: "supervisor-app",
        element: <SupervisorLayout />,
        children: [
          { index: true, element: <SupervisorAppConnected /> },
          { path: "dashboard", element: <SupervisorAppConnected /> },
          // R5 FIX NOTE: deep-linking to specific tabs requires SupervisorAppConnected
          // to read useLocation().pathname and set its initial active tab.
          // See SupervisorAppConnected fix in supervisor-fixes.
          { path: "team", element: <SupervisorAppConnected /> },
          { path: "audit", element: <SupervisorAppConnected /> },
          { path: "cloth", element: <SupervisorAppConnected /> },
          { path: "leads", element: <SupervisorAppConnected /> },
          { path: "incentive", element: <SupervisorAppConnected /> },
          { path: "issues", element: <SupervisorAppConnected /> },
          { path: "alerts", element: <SupervisorAppConnected /> },
          { path: "cover", element: <SupervisorAppConnected /> },
          { path: "visibility", element: <SupervisorAppConnected /> },
          { path: "audit-trail", element: <SupervisorAppConnected /> },
          { path: "kpi-dashboard", element: <SupervisorAppConnected /> },
        ]
      },

      // Operations Manager App (Production) - High-control command interface
      { path: "om-app", element: <OperationsManagerApp /> },

      // Cluster Manager App (Production) - Control tower interface
      { path: "cm-app", element: <ClusterManagerApp /> },

      // City Manager App (Production) - Control tower interface
      { path: "city-app", element: <CityManagerApp /> },

      // Organization Hierarchy Dashboard - City → Cluster → Pincode
      { path: "hierarchy-dashboard", element: <HierarchyDashboard /> },

      // Tele Sales Manager App (Production) - Pipeline control tower
      { path: "tsm-app", element: <TeleSalesManagerApp /> },
      { path: "sh-app", element: <SalesHeadApp /> },
      { path: "sm-app-alliance", element: <SalesManagerApp /> },

      // Tele Sales Executive App (Production) - Sales execution interface
      { path: "tse-app", element: <TeleSalesExecutiveApp /> },
      { path: "tse-diagnostics", element: <DevOnlyRoute element={<TSEDiagnostics />} /> },

      // Customer Care Executive App (Production) - Complaint management interface
      { path: "cce-app", element: <CustomerCareExecutiveApp /> },

      // BTL Service Test Page
      { path: "test-btl", element: <DevOnlyRoute element={<TestBTLService />} /> },

      // Subscription Management System (Production) - Dynamic plan system
      { path: "subscription-app", element: <SubscriptionApp /> },
      { path: "plans", element: <PlanSelectionScreen /> },
      { path: "buy",   element: <CustomerPlanPage /> },
      { path: "admin/plans", element: <ErrorBoundary><Suspense fallback={<PageLoader />}><AdminPlanManagement userRole="ADMIN" /></Suspense></ErrorBoundary> },
      { path: "admin/plan-page-editor", element: <ErrorBoundary><SuperAdminPlanEditor /></ErrorBoundary> },
      { path: "subscription-diagnostics", element: <DevOnlyRoute element={<SubscriptionDiagnostics />} /> },

      // Client Portal - Read-only client interface
      { path: "client-portal", element: <ClientPortal /> },

      // Workforce Management - Working Hours & Shift Configuration
      { path: "workforce/diagnostic", element: <DevOnlyRoute element={<WorkforceDiagnostic />} /> },
      { path: "workforce/test", element: <DevOnlyRoute element={<WorkingHoursTest />} /> },
      { path: "workforce/simple", element: <WorkingHoursSimple /> },
      { path: "workforce/working-hours", element: <WorkingHoursSetup /> },

      // Incentive Management System - Configuration, Simulation & Forecasting
      { path: "incentives/configuration", element: <ErrorBoundary><Suspense fallback={<PageLoader />}><IncentiveConfiguration /></Suspense></ErrorBoundary> },
      { path: "incentives/simulator", element: <IncentiveSimulator /> },
      { path: "incentives/forecast", element: <IncentiveDashboard /> },
      { path: "incentives", element: <Navigate to="/incentives/configuration" replace /> },

      // My Account - Employee self-service
      { path: "my-account", element: <MyAccountPage /> },
      { path: "my-account/mobile-change", element: <MobileChangeRequest /> },

      // Unauthorized page - shown when access denied
      { path: "unauthorized", element: <UnauthorizedPage /> },

      // Catch-all 404 for authenticated routes - must be last in children array
      { path: "*", element: <Navigate to="/" replace /> },
    ],
  },
]);
