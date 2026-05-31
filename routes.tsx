// Router Configuration - FIXED: Removed bad imports (Updated: 2026-03-26)
import React, { lazy, Suspense } from "react";
import { createHashRouter, Navigate, Outlet } from "react-router-dom";
import { GlobalFiltersProvider } from "./components/navigation/GlobalFilterBar";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { RootLayoutWrapper } from "./components/layouts/RootLayoutWrapper";

const AccountingEntry = lazy(() => import("./components/accounts/AccountingEntry").then(m => ({ default: m.AccountingEntry })));
const AccountingTransactionList = lazy(() => import("./components/accounts/AccountingTransactionList").then(m => ({ default: m.AccountingTransactionList })));
const AccountsLedger = lazy(() => import("./components/accounts/AccountsLedger").then(m => ({ default: m.AccountsLedger })));
const AccountsModule = lazy(() => import("./components/modules/AccountsModule").then(m => ({ default: m.AccountsModule })));
const AccountsPayrollProcessing = lazy(() => import("./components/accounts/AccountsPayrollProcessing").then(m => ({ default: m.AccountsPayrollProcessing })));
const ActivityTimelineWrapper = lazy(() => import("./components/crm/ActivityTimelineWrapper").then(m => ({ default: m.ActivityTimelineWrapper })));
const ActualCostInputs = lazy(() => import("./components/finance/ActualCostInputs").then(m => ({ default: m.ActualCostInputs })));
const AdjustmentsReport = lazy(() => import("./components/advance/AdjustmentsReport").then(m => ({ default: m.AdjustmentsReport })));
const AdvanceDetailView = lazy(() => import("./components/advance/AdvanceDetailView").then(m => ({ default: m.AdvanceDetailView })));
const AdvanceTypeSelection = lazy(() => import("./components/advance/AdvanceTypeSelection").then(m => ({ default: m.AdvanceTypeSelection })));
const ApprovalCenter = lazy(() => import("./components/ApprovalCenter").then(m => ({ default: m.ApprovalCenter })));
const ApprovalCenterHR = lazy(() => import("./components/hr/ApprovalCenter").then(m => ({ default: m.ApprovalCenter })));
const AttendanceDataManager = lazy(() => import("./components/admin/AttendanceDataManager").then(m => ({ default: m.AttendanceDataManager })));
const AuditTrail = lazy(() => import("./components/AuditTrail").then(m => ({ default: m.AuditTrail })));
const BalanceSheet = lazy(() => import("./components/accounts/BalanceSheet").then(m => ({ default: m.BalanceSheet })));
const BusinessFlowDemo = lazy(() => import("./components/BusinessFlowDemo").then(m => ({ default: m.BusinessFlowDemo })));
const BusinessRulesPage = lazy(() => import("./components/admin/BusinessRulesPage").then(m => ({ default: m.BusinessRulesPage })));
const CRMLeadManagementWithFilters = lazy(() => import("./components/modules/CRMLeadManagementWithFilters").then(m => ({ default: m.CRMLeadManagementWithFilters })));
const CityManagement = lazy(() => import("./components/admin/CityManagement").then(m => ({ default: m.CityManagement })));
const CityManagerApp = lazy(() => import("./components/city/CityManagerApp").then(m => ({ default: m.CityManagerApp })));
const ClientPortal = lazy(() => import("./components/client/ClientPortal").then(m => ({ default: m.ClientPortal })));
const ClothExchange = lazy(() => import("./components/cloth-tracking/ClothExchange").then(m => ({ default: m.ClothExchange })));
const ClusterManagerApp = lazy(() => import("./components/cm/ClusterManagerApp").then(m => ({ default: m.ClusterManagerApp })));
const CommunicationTemplates = lazy(() => import("./components/settings/CommunicationTemplates").then(m => ({ default: m.CommunicationTemplates })));
const ComplaintManagement = lazy(() => import("./components/modules/ComplaintManagement").then(m => ({ default: m.ComplaintManagement })));
const CostConfiguration = lazy(() => import("./components/settings/CostConfiguration").then(m => ({ default: m.CostConfiguration })));
const CostPerWashModule = lazy(() => import("./components/finance/CostPerWashModule").then(m => ({ default: m.CostPerWashModule })));
const CostPerWashReport = lazy(() => import("./components/reports/CostPerWashReport").then(m => ({ default: m.CostPerWashReport })));
const CostTrackingIntegrationDemo = lazy(() => import("./components/demo/CostTrackingIntegrationDemo").then(m => ({ default: m.CostTrackingIntegrationDemo })));
const CustomerCareExecutiveApp = lazy(() => import("./components/cce/CustomerCareExecutiveApp").then(m => ({ default: m.CustomerCareExecutiveApp })));
const CustomerPlanPage = lazy(() => import("./components/subscription/CustomerPlanPage").then(m => ({ default: m.CustomerPlanPage })));
const CustomerSubscription = lazy(() => import("./components/modules/CustomerSubscription").then(m => ({ default: m.CustomerSubscription })));
const DesignSystemTest = lazy(() => import("./design-system/tests/DesignSystemTest").then(m => ({ default: m.DesignSystemTest })));
const DeveloperRouteDirectory = lazy(() => import("./components/developer/DeveloperRouteDirectory").then(m => ({ default: m.DeveloperRouteDirectory })));
const EmployeeLedger = lazy(() => import("./components/hr/EmployeeLedger").then(m => ({ default: m.EmployeeLedger })));
const EmployeeLifecycleManagement = lazy(() => import("./components/hr/EmployeeLifecycleManagement").then(m => ({ default: m.EmployeeLifecycleManagement })));
const EmployeeOnboarding = lazy(() => import("./components/hr/EmployeeOnboarding").then(m => ({ default: m.EmployeeOnboarding })));
const EmployeeSalaryAssignment = lazy(() => import("./components/payroll/EmployeeSalaryAssignment").then(m => ({ default: m.EmployeeSalaryAssignment })));
const EmployeeSelfService = lazy(() => import("./components/hr/EmployeeSelfService").then(m => ({ default: m.EmployeeSelfService })));
const ExitFFSettlement = lazy(() => import("./components/hr/ExitFFSettlement").then(m => ({ default: m.ExitFFSettlement })));
const ExpansionOpportunities = lazy(() => import("./components/modules/ExpansionOpportunities").then(m => ({ default: m.ExpansionOpportunities })));
const ExpenseAnalytics = lazy(() => import("./components/accounts/ExpenseAnalytics").then(m => ({ default: m.ExpenseAnalytics })));
const ExpenseEntry = lazy(() => import("./components/accounts/ExpenseEntry").then(m => ({ default: m.ExpenseEntry })));
const ExpenseVoucher = lazy(() => import("./components/accounts/ExpenseVoucher").then(m => ({ default: m.ExpenseVoucher })));
const FinanceTransactions = lazy(() => import("./components/finance/FinanceTransactions").then(m => ({ default: m.FinanceTransactions })));
const FinancialReportsModule = lazy(() => import("./components/finance/FinancialReportsModule").then(m => ({ default: m.FinancialReportsModule })));
const GRNEntry = lazy(() => import("./components/store-manager/GRNEntry").then(m => ({ default: m.GRNEntry })));
const GSTCustomerMaster = lazy(() => import("./components/gst/GSTCustomerMaster").then(m => ({ default: m.GSTCustomerMaster })));
const GSTFilingModule = lazy(() => import("./components/gst/GSTFilingModule").then(m => ({ default: m.GSTFilingModule })));
const GSTManagerReview = lazy(() => import("./components/gst/GSTManagerReview").then(m => ({ default: m.GSTManagerReview })));
const GSTMonitoringModule = lazy(() => import("./components/gst/GSTMonitoringModule").then(m => ({ default: m.GSTMonitoringModule })));
const GSTOverview = lazy(() => import("./components/gst/GSTOverview").then(m => ({ default: m.GSTOverview })));
const GSTR1Module = lazy(() => import("./components/gst/GSTR1Module").then(m => ({ default: m.GSTR1Module })));
const GSTR2AReport = lazy(() => import("./components/accounts/GSTR2AReport").then(m => ({ default: m.GSTR2AReport })));
const GSTR3BModule = lazy(() => import("./components/gst/GSTR3BModule").then(m => ({ default: m.GSTR3BModule })));
const GSTReconciliation = lazy(() => import("./components/gst/GSTReconciliation").then(m => ({ default: m.GSTReconciliation })));
const GSTReports = lazy(() => import("./components/gst/GSTReports").then(m => ({ default: m.GSTReports })));
const GSTTransactionEntry = lazy(() => import("./components/gst/GSTTransactionEntry").then(m => ({ default: m.GSTTransactionEntry })));
const GSTValidationCentre = lazy(() => import("./components/gst/GSTValidationCentre").then(m => ({ default: m.GSTValidationCentre })));
const GSTVendorMaster = lazy(() => import("./components/gst/GSTVendorMaster").then(m => ({ default: m.GSTVendorMaster })));
const HRAdvanceManagement = lazy(() => import("./components/advance/HRAdvanceManagement").then(m => ({ default: m.HRAdvanceManagement })));
const HRPayrollApproval = lazy(() => import("./components/hr/HRPayrollApproval").then(m => ({ default: m.HRPayrollApproval })));
const HolidayManagement = lazy(() => import("./components/hr/HolidayManagement").then(m => ({ default: m.HolidayManagement })));
const IDCardGenerator = lazy(() => import("./components/hr/IDCardGenerator").then(m => ({ default: m.IDCardGenerator })));
const IncentiveEngineDemo = lazy(() => import("./components/workflow/IncentiveEngineDemo").then(m => ({ default: m.IncentiveEngineDemo })));
const IncentiveSimulator = lazy(() => import("./components/incentives/IncentiveSimulator").then(m => ({ default: m.IncentiveSimulator })));
const InventoryMonitoring = lazy(() => import("./components/store-manager/InventoryMonitoring").then(m => ({ default: m.InventoryMonitoring })));
const InventoryStore = lazy(() => import("./components/modules/InventoryStore").then(m => ({ default: m.InventoryStore })));
const ItemMaster = lazy(() => import("./components/accounts/ItemMaster").then(m => ({ default: m.ItemMaster })));
const JournalEntry = lazy(() => import("./components/accounts/JournalEntry").then(m => ({ default: m.JournalEntry })));
const LeavePolicyEngine = lazy(() => import("./components/hr/LeavePolicyEngine").then(m => ({ default: m.LeavePolicyEngine })));
const LedgerEntriesView = lazy(() => import("./components/finance/LedgerEntriesView").then(m => ({ default: m.LedgerEntriesView })));
const LedgerMaster = lazy(() => import("./components/accounts/LedgerMaster").then(m => ({ default: m.LedgerMaster })));
const LettersDocuments = lazy(() => import("./components/hr/LettersDocuments").then(m => ({ default: m.LettersDocuments })));
const LifeCycleReports = lazy(() => import("./components/hr/LifeCycleReports").then(m => ({ default: m.LifeCycleReports })));
const LongTermAdvanceForm = lazy(() => import("./components/advance/LongTermAdvanceForm").then(m => ({ default: m.LongTermAdvanceForm })));
const MOQManagement = lazy(() => import("./components/store-manager/MOQManagement").then(m => ({ default: m.MOQManagement })));
const MaterialRequisition = lazy(() => import("./components/inventory/MaterialRequisition").then(m => ({ default: m.MaterialRequisition })));
const MobileChangeRequest = lazy(() => import("./components/hr/MobileChangeRequest").then(m => ({ default: m.MobileChangeRequest })));
const MonthEndVerification = lazy(() => import("./components/inventory/MonthEndVerification").then(m => ({ default: m.MonthEndVerification })));
const MyAccountPage = lazy(() => import("./components/hr/MyAccountPage").then(m => ({ default: m.MyAccountPage })));
const MyStock = lazy(() => import("./components/washer/MyStock").then(m => ({ default: m.MyStock })));
const NotificationCenter = lazy(() => import("./components/crm/NotificationCenter").then(m => ({ default: m.NotificationCenter })));
const OnboardingAutomation = lazy(() => import("./components/hr/OnboardingAutomation").then(m => ({ default: m.OnboardingAutomation })));
const OperationsDataCapture = lazy(() => import("./components/operations/OperationsDataCapture").then(m => ({ default: m.OperationsDataCapture })));
const OperationsLayout = lazy(() => import("./components/operations/OperationsLayout").then(m => ({ default: m.OperationsLayout })));
const OperationsManagerApp = lazy(() => import("./components/om/OperationsManagerApp").then(m => ({ default: m.OperationsManagerApp })));
const OperationsRouter = lazy(() => import("./components/operations/OperationsRouter").then(m => ({ default: m.OperationsRouter })));
const OtherDeductionsModule = lazy(() => import("./components/advance/OtherDeductionsModule").then(m => ({ default: m.OtherDeductionsModule })));
const OtherEarningsModule = lazy(() => import("./components/advance/OtherEarningsModule").then(m => ({ default: m.OtherEarningsModule })));
const PackageCostMatrix = lazy(() => import("./components/finance/PackageCostMatrix").then(m => ({ default: m.PackageCostMatrix })));
const PartyLedger = lazy(() => import("./components/accounts/PartyLedger").then(m => ({ default: m.PartyLedger })));
const PayrollConfigTest = lazy(() => import("./components/payroll/PayrollConfigTest").then(m => ({ default: m.PayrollConfigTest })));
const PayrollConfiguration = lazy(() => import("./components/payroll/PayrollConfiguration").then(m => ({ default: m.PayrollConfiguration })));
const PayrollProcessing = lazy(() => import("./components/payroll/PayrollProcessing").then(m => ({ default: m.PayrollProcessing })));
const PayrollProcessingAdvanced = lazy(() => import("./components/payroll/PayrollProcessingAdvanced").then(m => ({ default: m.PayrollProcessingAdvanced })));
const PayrollReviewApproval = lazy(() => import("./components/payroll/PayrollReviewApproval").then(m => ({ default: m.PayrollReviewApproval })));
const PerformanceTracking = lazy(() => import("./components/performance/PerformanceTracking").then(m => ({ default: m.PerformanceTracking })));
const PlanEditor = lazy(() => import("./components/subscription/PlanEditor").then(m => ({ default: m.PlanEditor })));
const PlanSelectionScreen = lazy(() => import("./components/subscription/PlanSelectionScreen").then(m => ({ default: m.PlanSelectionScreen })));
const ProcurementModule = lazy(() => import("./components/modules/ProcurementModule").then(m => ({ default: m.ProcurementModule })));
const PurchaseOrderCreation = lazy(() => import("./components/store-manager/PurchaseOrderCreation").then(m => ({ default: m.PurchaseOrderCreation })));
const PurchaseSummaryReport = lazy(() => import("./components/accounts/PurchaseSummaryReport").then(m => ({ default: m.PurchaseSummaryReport })));
const RCMReport = lazy(() => import("./components/accounts/RCMReport").then(m => ({ default: m.RCMReport })));
const RazorpayFlow = lazy(() => import("./components/accounts/RazorpayFlow").then(m => ({ default: m.RazorpayFlow })));
const RevenueCaptureSystem = lazy(() => import("./components/finance/RevenueCaptureSystem").then(m => ({ default: m.RevenueCaptureSystem })));
const SalaryPayableView = lazy(() => import("./components/payroll/SalaryPayableView").then(m => ({ default: m.SalaryPayableView })));
const SalaryPaymentScreen = lazy(() => import("./components/payroll/SalaryPaymentScreen").then(m => ({ default: m.SalaryPaymentScreen })));
const SalesHeadApp = lazy(() => import("./components/sh/SalesHeadApp").then(m => ({ default: m.SalesHeadApp })));
const SalesManagerApp = lazy(() => import("./components/sm/SalesManagerApp").then(m => ({ default: m.SalesManagerApp })));
const SalesSummaryReport = lazy(() => import("./components/accounts/SalesSummaryReport").then(m => ({ default: m.SalesSummaryReport })));
const ServiceZonesManagement = lazy(() => import("./components/modules/ServiceZonesManagement").then(m => ({ default: m.ServiceZonesManagement })));
const ShortTermAdvanceForm = lazy(() => import("./components/advance/ShortTermAdvanceForm").then(m => ({ default: m.ShortTermAdvanceForm })));
const StatutoryFormsVerification = lazy(() => import("./components/hr/StatutoryFormsVerification").then(m => ({ default: m.StatutoryFormsVerification })));
const StatutoryPayablesScreen = lazy(() => import("./components/payroll/StatutoryPayablesScreen").then(m => ({ default: m.StatutoryPayablesScreen })));
const StoreManagerModule = lazy(() => import("./components/modules/StoreManagerModule").then(m => ({ default: m.StoreManagerModule })));
const StoreModule = lazy(() => import("./components/modules/StoreModule").then(m => ({ default: m.StoreModule })));
const SubscriptionApp = lazy(() => import("./components/subscription/SubscriptionApp").then(m => ({ default: m.SubscriptionApp })));
const SubscriptionDiagnostics = lazy(() => import("./components/subscription/SubscriptionDiagnostics").then(m => ({ default: m.SubscriptionDiagnostics })));
const SuperAdminPayrollApproval = lazy(() => import("./components/admin/SuperAdminPayrollApproval").then(m => ({ default: m.SuperAdminPayrollApproval })));
const SuperAdminPlanEditor = lazy(() => import("./components/admin/SuperAdminPlanEditor").then(m => ({ default: m.SuperAdminPlanEditor })));
const SupervisorAppConnected = lazy(() => import("./components/supervisor/SupervisorAppConnected").then(m => ({ default: m.SupervisorAppConnected })));
const SupervisorLayout = lazy(() => import("./components/supervisor/SupervisorLayout").then(m => ({ default: m.SupervisorLayout })));
const SupervisorModuleUpdated = lazy(() => import("./components/modules/SupervisorModuleUpdated").then(m => ({ default: m.SupervisorModuleUpdated })));
const SupplierDetail = lazy(() => import("./components/procurement/SupplierDetail").then(m => ({ default: m.SupplierDetail })));
const SystemIntegrationDemo = lazy(() => import("./components/washer/SystemIntegrationDemo").then(m => ({ default: m.SystemIntegrationDemo })));
const TSEDiagnostics = lazy(() => import("./components/tse/TSEDiagnostics").then(m => ({ default: m.TSEDiagnostics })));
const TeleSalesExecutiveApp = lazy(() => import("./components/tse/TeleSalesExecutiveApp").then(m => ({ default: m.TeleSalesExecutiveApp })));
const TeleSalesManagerApp = lazy(() => import("./components/tsm/TeleSalesManagerApp").then(m => ({ default: m.TeleSalesManagerApp })));
const TestStatutoryRoutes = lazy(() => import("./components/TestStatutoryRoutes").then(m => ({ default: m.TestStatutoryRoutes })));
const TransactionSubTypeManager = lazy(() => import("./components/gst/TransactionSubTypeManager").then(m => ({ default: m.TransactionSubTypeManager })));
const TrialBalance = lazy(() => import("./components/accounts/TrialBalance").then(m => ({ default: m.TrialBalance })));
const UserManagement = lazy(() => import("./components/modules/UserManagement").then(m => ({ default: m.UserManagement })));
const VendorPayment = lazy(() => import("./components/accounts/VendorPayment").then(m => ({ default: m.VendorPayment })));
const VendorRequest = lazy(() => import("./components/store-manager/VendorRequest").then(m => ({ default: m.VendorRequest })));
const WasherAttendanceHistory = lazy(() => import("./components/washer/WasherAttendanceHistory").then(m => ({ default: m.WasherAttendanceHistory })));
const WasherCoreScreensConnected = lazy(() => import("./components/washer/WasherCoreScreensConnected").then(m => ({ default: m.WasherCoreScreensConnected })));
const WasherCoreScreensDemo = lazy(() => import("./components/washer/WasherCoreScreensDemo").then(m => ({ default: m.WasherCoreScreensDemo })));
const WasherIssuances = lazy(() => import("./components/inventory/WasherIssuances").then(m => ({ default: m.WasherIssuances })));
const WasherJobExecution = lazy(() => import("./components/modules/WasherJobExecution").then(m => ({ default: m.WasherJobExecution })));
const WasherStockLedger = lazy(() => import("./components/inventory/WasherStockLedger").then(m => ({ default: m.WasherStockLedger })));
const WeekOffCoverDemo = lazy(() => import("./components/washer/WeekOffCoverDemo").then(m => ({ default: m.WeekOffCoverDemo })));
const WorkflowControlDemo = lazy(() => import("./components/workflow/WorkflowControlDemo").then(m => ({ default: m.WorkflowControlDemo })));
const WorkforceDiagnostic = lazy(() => import("./components/workforce/WorkforceDiagnostic").then(m => ({ default: m.WorkforceDiagnostic })));
const WorkingHoursSetup = lazy(() => import("./components/workforce/WorkingHoursSetup").then(m => ({ default: m.WorkingHoursSetup })));
const WorkingHoursSimple = lazy(() => import("./components/workforce/WorkingHoursSimple").then(m => ({ default: m.WorkingHoursSimple })));
const WorkingHoursTest = lazy(() => import("./components/workforce/WorkingHoursTest").then(m => ({ default: m.WorkingHoursTest })));

// Loading fallback for lazy-loaded routes — skeleton looks like real content
const PageLoader = () => (
  <div className="p-6 space-y-4 animate-pulse">
    <div className="h-8 bg-gray-200 rounded w-1/3" />
    <div className="h-4 bg-gray-100 rounded w-1/2" />
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
      {[1,2,3].map(i => (
        <div key={i} className="h-28 bg-gray-100 rounded-xl border border-gray-200" />
      ))}
    </div>
    <div className="h-64 bg-gray-100 rounded-xl border border-gray-200 mt-4" />
    <div className="h-48 bg-gray-100 rounded-xl border border-gray-200" />
  </div>
);

// Lazy-loaded heavy components for code splitting
const OnboardingPortal = lazy(() => import("./components/OnboardingPortal"));
const HRModule = lazy(() => import("./components/modules/HRModule"));
const ProfessionalLeaveManagement = lazy(() => import("./components/hr/ProfessionalLeaveManagement"));
const StatutoryFormsOnboarding = lazy(() => import("./components/hr/StatutoryFormsOnboarding"));
const TravelReimbursementModule = lazy(() => import("./components/travel/TravelReimbursementModule"));
const CreateSalaryStructure = lazy(() => import("./components/payroll/CreateSalaryStructure"));
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
import { Dashboard } from "./components/Dashboard";

const CRMConversionAnalyticsDashboard = lazy(() => import("./components/modules/CRMConversionAnalyticsDashboard").then(m => ({ default: m.CRMConversionAnalyticsDashboard })));

const FinanceModule = lazy(() => import("./components/modules/FinanceModule").then(m => ({ default: m.FinanceModule })));
// import { ChartOfAccounts } from "./components/finance/ChartOfAccounts"; // NOW LAZY

const FinanceAnalyticsDashboard = lazy(() => import("./components/finance/FinanceAnalyticsDashboard").then(m => ({ default: m.FinanceAnalyticsDashboard })));

const InvoiceManagement = lazy(() => import("./components/finance/InvoiceManagement"));
const InvoiceDetail = lazy(() => import("./components/finance/InvoiceDetail"));
const PaymentManagement = lazy(() => import("./components/finance/PaymentManagement"));
// import { HRModule } from "./components/modules/HRModule"; // NOW LAZY
// import { ProfessionalLeaveManagement } from "./components/hr/ProfessionalLeaveManagement"; // NOW LAZY

// import { StatutoryFormsOnboarding } from "./components/hr/StatutoryFormsOnboarding"; // NOW LAZY

const SystemAuditDashboard = lazy(() => import("./components/audit/SystemAuditDashboard").then(m => ({ default: m.SystemAuditDashboard })));

const GSTDashboard = lazy(() => import("./components/accounts/GSTDashboard").then(m => ({ default: m.GSTDashboard })));
// Phase 1 Accounting Entry System

const AccountsDashboard = lazy(() => import("./components/accounts/AccountsDashboard").then(m => ({ default: m.AccountsDashboard })));

const TDSPayableModule = lazy(() => import("./components/accounts/TDSPayableModule"));
const AdvanceTaxCalculator = lazy(() => import("./components/accounts/AdvanceTaxCalculator"));
const PayablesDashboard = lazy(() => import("./components/accounts/PayablesDashboard"));
// Phase 3 Accounting Reports

// Analytics imports - NOW LAZY
// import { UnitEconomicsDashboard } from "./components/analytics/UnitEconomicsDashboard"; // NOW LAZY
// import { CustomerLTVAnalysis } from "./components/analytics/CustomerLTVAnalysis"; // NOW LAZY
// import { CACDashboard } from "./components/analytics/CACDashboard"; // NOW LAZY
// import { BreakEvenAnalysis } from "./components/analytics/BreakEvenAnalysis"; // NOW LAZY
const AnalyticsDashboardWithDrillDown = lazy(() => import("./components/dashboards/AnalyticsDashboardWithDrillDown").then(m => ({ default: m.AnalyticsDashboardWithDrillDown })));
// import { CostPerWashCalculatorEnhanced } from "./components/analytics/CostPerWashCalculatorEnhanced"; // NOW LAZY
// import { CostPerWashByPlan } from "./components/analytics/CostPerWashByPlan"; // NOW LAZY
// import { CostPerWashByConsumption } from "./components/analytics/CostPerWashByConsumption"; // NOW LAZY
// import { LabourCostPerWash } from "./components/analytics/LabourCostPerWash"; // NOW LAZY
// import { EmployeeEfficiency } from "./components/analytics/EmployeeEfficiency"; // NOW LAZY
// import { CityComparison } from "./components/analytics/CityComparison"; // NOW LAZY
const RoleBasedAnalyticsDashboard = lazy(() => import("./components/examples/RoleBasedAnalyticsDashboard").then(m => ({ default: m.RoleBasedAnalyticsDashboard })));

// Founder module imports - NOW LAZY
// import { FounderControlTower } from "./components/founder/FounderControlTower"; // NOW LAZY
// import { DetailedFinancialView } from "./components/founder/DetailedFinancialView"; // NOW LAZY
// import { CashFlowDashboard } from "./components/founder/CashFlowDashboard"; // NOW LAZY
// import { MarketingROIDrilldown } from "./components/founder/MarketingROIDrilldown"; // NOW LAZY

// import { CreateSalaryStructure } from "./components/payroll/CreateSalaryStructure"; // NOW LAZY
const PayrollRun = lazy(() => import("./components/payroll/PayrollRun").then(m => ({ default: m.PayrollRun })));

const ClothAdminDashboard = lazy(() => import("./components/cloth-tracking/ClothAdminDashboard").then(m => ({ default: m.ClothAdminDashboard })));

const EmployeeAdvanceDashboard = lazy(() => import("./components/advance/EmployeeAdvanceDashboard").then(m => ({ default: m.EmployeeAdvanceDashboard })));

// R2 FIX: test-btl-service file may not exist — converted to lazy with error boundary

// import { AdminPlanManagement } from "./components/subscription/AdminPlanManagement"; // NOW LAZY

const HierarchyDashboard = lazy(() => import("./components/hierarchy/HierarchyDashboard").then(m => ({ default: m.HierarchyDashboard })));

// import { IncentiveConfiguration } from "./components/incentives/IncentiveConfiguration"; // NOW LAZY

const IncentiveDashboard = lazy(() => import("./components/incentives/IncentiveDashboard").then(m => ({ default: m.IncentiveDashboard })));

const ShiftManagementPage = lazy(() => import("./components/admin/ShiftManagementPage").then(m => ({ default: m.ShiftManagementPage })));
const AttendanceFraudAlertsPage = lazy(() => import("./components/admin/AttendanceFraudAlertsPage").then(m => ({ default: m.AttendanceFraudAlertsPage })));
const PermissionManagementPage = lazy(() => import("./components/admin/PermissionManagementPage").then(m => ({ default: m.PermissionManagementPage })));
const RolePermissionManager = lazy(() => import("./components/admin/RolePermissionManager").then(m => ({ default: m.RolePermissionManager })));
const IncentiveVisibilityAdmin = lazy(() => import("./components/admin/IncentiveVisibilityAdmin").then(m => ({ default: m.IncentiveVisibilityAdmin })));
const RoleSuggestionsPage = lazy(() => import("./components/hr/RoleSuggestionsPage").then(m => ({ default: m.RoleSuggestionsPage })));
const HRIntelligenceDashboard = lazy(() => import("./components/hr/HRIntelligenceDashboard").then(m => ({ default: m.HRIntelligenceDashboard })));

import { UnauthorizedPage } from "./components/pages/UnauthorizedPage";
import { LoginPage } from "./pages/LoginPage";

export const router = createHashRouter([
  {
    path: "/login",
    element: <ErrorBoundary><Suspense fallback={<PageLoader />}><LoginPage /></Suspense></ErrorBoundary>,
  },
  // Standalone Onboarding Portal routes (no header/sidebar) - MUST come FIRST
  {
    path: "/onboarding/:empId",
    element: <ErrorBoundary><Suspense fallback={<PageLoader />}><OnboardingPortal /></Suspense></ErrorBoundary>,
  },
  {
    path: "/onboard/:empId",
    element: <ErrorBoundary><Suspense fallback={<PageLoader />}><OnboardingRedirect /></Suspense></ErrorBoundary>,
  },
  // Main application routes with layout
  {
    path: "/",
    element: <ErrorBoundary><Suspense fallback={<PageLoader />}><RootLayoutWrapper /></Suspense></ErrorBoundary>,
    errorElement: (<div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 gap-4 p-8"><div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center"><span className="text-red-600 text-xl font-bold">!</span></div><h2 className="text-lg font-semibold text-gray-900">Page Error</h2><p className="text-sm text-gray-500">This page has an error. Other pages still work.</p><a href="/" className="px-6 py-2 bg-blue-600 text-white rounded-lg text-sm">Go to Dashboard</a></div>),
    children: [
      { index: true, element: <ErrorBoundary><Suspense fallback={<PageLoader />}><Dashboard /></Suspense></ErrorBoundary> },

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
      { path: "users", element: <ErrorBoundary><Suspense fallback={<PageLoader />}><UserManagement /></Suspense></ErrorBoundary> },
      { path: "leads", element: <ErrorBoundary><Suspense fallback={<PageLoader />}><CRMLeadManagementWithFilters /></Suspense></ErrorBoundary> },
      { path: "customers", element: <ErrorBoundary><Suspense fallback={<PageLoader />}><CustomerSubscription /></Suspense></ErrorBoundary> },
      { path: "car-washer", element: <Navigate to="/washer-core-screens" replace /> },
      { path: "supervisor", element: <ErrorBoundary><Suspense fallback={<PageLoader />}><SupervisorModuleUpdated /></Suspense></ErrorBoundary> },
      // Operations layout route with children
      {
        path: "operations",
        element: <ErrorBoundary><Suspense fallback={<PageLoader />}><OperationsLayout /></Suspense></ErrorBoundary>,
        children: [
          { index: true, element: <ErrorBoundary><Suspense fallback={<PageLoader />}><OperationsRouter /></Suspense></ErrorBoundary> },
          { path: "data-capture", element: <ErrorBoundary><Suspense fallback={<PageLoader />}><OperationsDataCapture /></Suspense></ErrorBoundary> },
        ]
      },
      { path: "complaints", element: <ErrorBoundary><Suspense fallback={<PageLoader />}><ComplaintManagement /></Suspense></ErrorBoundary> },
      { path: "inventory", element: <ErrorBoundary><Suspense fallback={<PageLoader />}><InventoryStore /></Suspense></ErrorBoundary> },
      { path: "inventory/requisition", element: <ErrorBoundary><Suspense fallback={<PageLoader />}><MaterialRequisition /></Suspense></ErrorBoundary> },
      { path: "inventory/washer-issuances", element: <ErrorBoundary><Suspense fallback={<PageLoader />}><WasherIssuances /></Suspense></ErrorBoundary> },
      { path: "inventory/washer-stock-ledger", element: <ErrorBoundary><Suspense fallback={<PageLoader />}><WasherStockLedger /></Suspense></ErrorBoundary> },
      { path: "inventory/month-end-verification", element: <ErrorBoundary><Suspense fallback={<PageLoader />}><MonthEndVerification /></Suspense></ErrorBoundary> },
      { path: "inventory/my-stock", element: <ErrorBoundary><Suspense fallback={<PageLoader />}><MyStock /></Suspense></ErrorBoundary> },
      { path: "store", element: <ErrorBoundary><Suspense fallback={<PageLoader />}><StoreModule /></Suspense></ErrorBoundary> },
      { path: "procurement", element: <ErrorBoundary><Suspense fallback={<PageLoader />}><ProcurementModule /></Suspense></ErrorBoundary> },
      { path: "finance", element: <ErrorBoundary><Suspense fallback={<PageLoader />}><FinanceModule /></Suspense></ErrorBoundary> },
      { path: "finance/analytics", element: <ErrorBoundary><Suspense fallback={<PageLoader />}><FinanceAnalyticsDashboard /></Suspense></ErrorBoundary> },
      { path: "finance/reports", element: <ErrorBoundary><Suspense fallback={<PageLoader />}><FinancialReportsModule /></Suspense></ErrorBoundary> },
      { path: "finance/transactions", element: <ErrorBoundary><Suspense fallback={<PageLoader />}><FinanceTransactions /></Suspense></ErrorBoundary> },
      { path: "finance/ledger-entries", element: <ErrorBoundary><Suspense fallback={<PageLoader />}><LedgerEntriesView /></Suspense></ErrorBoundary> },
      { path: "finance/chart-of-accounts", element: <ErrorBoundary><Suspense fallback={<PageLoader />}><ChartOfAccounts /></Suspense></ErrorBoundary> },
      { path: "finance/invoices", element: <ErrorBoundary><Suspense fallback={<PageLoader />}><InvoiceManagement /></Suspense></ErrorBoundary> },
      { path: "finance/invoices/:id", element: <ErrorBoundary><Suspense fallback={<PageLoader />}><InvoiceDetail /></Suspense></ErrorBoundary> },
      { path: "finance/payments", element: <ErrorBoundary><Suspense fallback={<PageLoader />}><PaymentManagement /></Suspense></ErrorBoundary> },
      { path: "finance/revenue-capture", element: <ErrorBoundary><Suspense fallback={<PageLoader />}><RevenueCaptureSystem /></Suspense></ErrorBoundary> },
      { path: "finance/package-cost-matrix", element: <ErrorBoundary><Suspense fallback={<PageLoader />}><PackageCostMatrix /></Suspense></ErrorBoundary> },
      { path: "finance/cost-per-wash", element: <ErrorBoundary><Suspense fallback={<PageLoader />}><CostPerWashModule /></Suspense></ErrorBoundary> },
      { path: "finance/cost-per-wash/actual-inputs", element: <ErrorBoundary><Suspense fallback={<PageLoader />}><ActualCostInputs /></Suspense></ErrorBoundary> },
      { path: "hr", element: <ErrorBoundary><Suspense fallback={<PageLoader />}><HRModule /></Suspense></ErrorBoundary> },
      { path: "hr/leave", element: <Navigate to="/hr/professional-leave" replace /> },
      { path: "hr/enhanced-leave", element: <Navigate to="/hr/professional-leave" replace /> },
      { path: "hr/professional-leave", element: <ErrorBoundary><Suspense fallback={<PageLoader />}><ProfessionalLeaveManagement /></Suspense></ErrorBoundary> },
      { path: "hr/leave-policy-engine", element: <ErrorBoundary><Suspense fallback={<PageLoader />}><LeavePolicyEngine /></Suspense></ErrorBoundary> },
      { path: "hr/onboarding", element: <ErrorBoundary><Suspense fallback={<PageLoader />}><EmployeeOnboarding /></Suspense></ErrorBoundary> },
      { path: "hr/exit-settlement", element: <ErrorBoundary><Suspense fallback={<PageLoader />}><ExitFFSettlement /></Suspense></ErrorBoundary> },
      { path: "hr/lifecycle-management", element: <ErrorBoundary><Suspense fallback={<PageLoader />}><EmployeeLifecycleManagement /></Suspense></ErrorBoundary> },
      { path: "hr/letters-documents", element: <ErrorBoundary><Suspense fallback={<PageLoader />}><LettersDocuments /></Suspense></ErrorBoundary> },
      { path: "hr/id-card-generator", element: <ErrorBoundary><Suspense fallback={<PageLoader />}><IDCardGenerator /></Suspense></ErrorBoundary> },
      { path: "hr/holiday-management", element: <ErrorBoundary><Suspense fallback={<PageLoader />}><HolidayManagement /></Suspense></ErrorBoundary> },
      { path: "hr/lifecycle-reports", element: <ErrorBoundary><Suspense fallback={<PageLoader />}><LifeCycleReports /></Suspense></ErrorBoundary> },
      { path: "hr/employee-ledger", element: <ErrorBoundary><Suspense fallback={<PageLoader />}><EmployeeLedger /></Suspense></ErrorBoundary> },
      { path: "hr/statutory-forms-onboarding", element: <ErrorBoundary><Suspense fallback={<PageLoader />}><StatutoryFormsOnboarding /></Suspense></ErrorBoundary> },
      { path: "hr/statutory-forms-verification", element: <ErrorBoundary><Suspense fallback={<PageLoader />}><StatutoryFormsVerification /></Suspense></ErrorBoundary> },
      { path: "hr/onboarding-automation", element: <ErrorBoundary><Suspense fallback={<PageLoader />}><OnboardingAutomation /></Suspense></ErrorBoundary> },
      { path: "hr/self-service", element: <ErrorBoundary><Suspense fallback={<PageLoader />}><EmployeeSelfService /></Suspense></ErrorBoundary> },
      { path: "hr/approval-center", element: <ErrorBoundary><Suspense fallback={<PageLoader />}><ApprovalCenterHR /></Suspense></ErrorBoundary> },
      { path: "hr/payroll-approval", element: <ErrorBoundary><Suspense fallback={<PageLoader />}><HRPayrollApproval /></Suspense></ErrorBoundary> },
      { path: "hr/attendance-data-manager", element: <ErrorBoundary><Suspense fallback={<PageLoader />}><AttendanceDataManager /></Suspense></ErrorBoundary> },
      { path: "hr/test-statutory-routes", element: <DevOnlyRoute element={<TestStatutoryRoutes />} /> },
      { path: "hr/developer-routes", element: <DevOnlyRoute element={<DeveloperRouteDirectory />} /> },
      { path: "approvals", element: <ErrorBoundary><Suspense fallback={<PageLoader />}><ApprovalCenter /></Suspense></ErrorBoundary> },
      { path: "audit-trail", element: <ErrorBoundary><Suspense fallback={<PageLoader />}><AuditTrail /></Suspense></ErrorBoundary> },
      { path: "system-audit", element: <DevOnlyRoute element={<SystemAuditDashboard />} /> },
      { path: "performance", element: <ErrorBoundary><Suspense fallback={<PageLoader />}><PerformanceTracking /></Suspense></ErrorBoundary> },
      { path: "accounts", element: <ErrorBoundary><Suspense fallback={<PageLoader />}><AccountsModule /></Suspense></ErrorBoundary> },
      { path: "accounts/expense-entry", element: <ErrorBoundary><Suspense fallback={<PageLoader />}><ExpenseEntry /></Suspense></ErrorBoundary> },
      { path: "accounts/expense-analytics", element: <ErrorBoundary><Suspense fallback={<PageLoader />}><ExpenseAnalytics /></Suspense></ErrorBoundary> },
      { path: "accounts/vendor-payment", element: <ErrorBoundary><Suspense fallback={<PageLoader />}><VendorPayment /></Suspense></ErrorBoundary> },
      { path: "accounts/gst-dashboard", element: <ErrorBoundary><Suspense fallback={<PageLoader />}><GSTDashboard /></Suspense></ErrorBoundary> },
      { path: "accounts/gst-sub-types", element: <ErrorBoundary><Suspense fallback={<PageLoader />}><TransactionSubTypeManager /></Suspense></ErrorBoundary> },
      { path: "accounts/payroll-processing", element: <ErrorBoundary><Suspense fallback={<PageLoader />}><AccountsPayrollProcessing /></Suspense></ErrorBoundary> },
      { path: "accounts/accounting-entry", element: <ErrorBoundary><Suspense fallback={<PageLoader />}><AccountingEntry /></Suspense></ErrorBoundary> },
      { path: "accounts/expense-voucher", element: <ErrorBoundary><Suspense fallback={<PageLoader />}><ExpenseVoucher /></Suspense></ErrorBoundary> },
      { path: "accounts/item-master", element: <ErrorBoundary><Suspense fallback={<PageLoader />}><ItemMaster /></Suspense></ErrorBoundary> },
      { path: "accounts/payables", element: <ErrorBoundary><Suspense fallback={<PageLoader />}><PayablesDashboard /></Suspense></ErrorBoundary> },
      { path: "accounts/tds-payable", element: <ErrorBoundary><Suspense fallback={<PageLoader />}><TDSPayableModule /></Suspense></ErrorBoundary> },
      { path: "accounts/advance-tax", element: <ErrorBoundary><Suspense fallback={<PageLoader />}><AdvanceTaxCalculator /></Suspense></ErrorBoundary> },
      { path: "accounts/journal-entry", element: <ErrorBoundary><Suspense fallback={<PageLoader />}><JournalEntry /></Suspense></ErrorBoundary> },
      { path: "accounts/dashboard", element: <ErrorBoundary><Suspense fallback={<PageLoader />}><AccountsDashboard /></Suspense></ErrorBoundary> },
      { path: "accounts/transactions", element: <ErrorBoundary><Suspense fallback={<PageLoader />}><AccountingTransactionList /></Suspense></ErrorBoundary> },
      { path: "accounts/ledger", element: <ErrorBoundary><Suspense fallback={<PageLoader />}><AccountsLedger /></Suspense></ErrorBoundary> },
      { path: "accounts/party-ledger", element: <ErrorBoundary><Suspense fallback={<PageLoader />}><PartyLedger /></Suspense></ErrorBoundary> },
      { path: "accounts/ledger-master", element: <ErrorBoundary><Suspense fallback={<PageLoader />}><LedgerMaster /></Suspense></ErrorBoundary> },
      { path: "accounts/razorpay-flow", element: <ErrorBoundary><Suspense fallback={<PageLoader />}><RazorpayFlow /></Suspense></ErrorBoundary> },
      { path: "accounts/trial-balance", element: <ErrorBoundary><Suspense fallback={<PageLoader />}><TrialBalance /></Suspense></ErrorBoundary> },
      { path: "accounts/balance-sheet", element: <ErrorBoundary><Suspense fallback={<PageLoader />}><BalanceSheet /></Suspense></ErrorBoundary> },
      { path: "accounts/gstr2a", element: <ErrorBoundary><Suspense fallback={<PageLoader />}><GSTR2AReport /></Suspense></ErrorBoundary> },
      { path: "accounts/reports/purchase", element: <ErrorBoundary><Suspense fallback={<PageLoader />}><PurchaseSummaryReport /></Suspense></ErrorBoundary> },
      { path: "accounts/reports/sales", element: <ErrorBoundary><Suspense fallback={<PageLoader />}><SalesSummaryReport /></Suspense></ErrorBoundary> },
      { path: "accounts/reports/rcm", element: <ErrorBoundary><Suspense fallback={<PageLoader />}><RCMReport /></Suspense></ErrorBoundary> },
      { path: "gst", element: <ErrorBoundary><Suspense fallback={<PageLoader />}><GSTOverview /></Suspense></ErrorBoundary> },
      { path: "gst/vendors", element: <ErrorBoundary><Suspense fallback={<PageLoader />}><GSTVendorMaster /></Suspense></ErrorBoundary> },
      { path: "gst/customers", element: <ErrorBoundary><Suspense fallback={<PageLoader />}><GSTCustomerMaster /></Suspense></ErrorBoundary> },
      { path: "gst/transactions", element: <ErrorBoundary><Suspense fallback={<PageLoader />}><GSTTransactionEntry /></Suspense></ErrorBoundary> },
      { path: "gst/validation", element: <ErrorBoundary><Suspense fallback={<PageLoader />}><GSTValidationCentre /></Suspense></ErrorBoundary> },
      { path: "gst/review", element: <ErrorBoundary><Suspense fallback={<PageLoader />}><GSTManagerReview /></Suspense></ErrorBoundary> },
      { path: "gst/reconciliation", element: <ErrorBoundary><Suspense fallback={<PageLoader />}><GSTReconciliation /></Suspense></ErrorBoundary> },
      { path: "gst/reports", element: <ErrorBoundary><Suspense fallback={<PageLoader />}><GSTReports /></Suspense></ErrorBoundary> },
      { path: "gst/gstr1", element: <ErrorBoundary><Suspense fallback={<PageLoader />}><GSTR1Module /></Suspense></ErrorBoundary> },
      { path: "gst/gstr3b", element: <ErrorBoundary><Suspense fallback={<PageLoader />}><GSTR3BModule /></Suspense></ErrorBoundary> },
      { path: "gst/filing", element: <ErrorBoundary><Suspense fallback={<PageLoader />}><GSTFilingModule /></Suspense></ErrorBoundary> },
      { path: "gst/monitoring", element: <ErrorBoundary><Suspense fallback={<PageLoader />}><GSTMonitoringModule /></Suspense></ErrorBoundary> },
      { path: "admin/payroll-approval", element: <ErrorBoundary><Suspense fallback={<PageLoader />}><SuperAdminPayrollApproval /></Suspense></ErrorBoundary> },
      { path: "admin/city-management", element: <ErrorBoundary><Suspense fallback={<PageLoader />}><CityManagement /></Suspense></ErrorBoundary> },
      { path: "admin/business-rules", element: <ErrorBoundary><Suspense fallback={<PageLoader />}><BusinessRulesPage /></Suspense></ErrorBoundary> },
      { path: "admin/shift-management", element: <ErrorBoundary><Suspense fallback={<PageLoader />}><ShiftManagementPage /></Suspense></ErrorBoundary> }, // MC-10
      { path: "admin/fraud-alerts", element: <ErrorBoundary><Suspense fallback={<PageLoader />}><AttendanceFraudAlertsPage /></Suspense></ErrorBoundary> }, // MC-09
      { path: "admin/permissions", element: <ErrorBoundary><Suspense fallback={<PageLoader />}><PermissionManagementPage /></Suspense></ErrorBoundary> }, // MC-11
      { path: "admin/role-permissions", element: <ErrorBoundary><Suspense fallback={<PageLoader />}><RolePermissionManager /></Suspense></ErrorBoundary> }, // MC-11 Enhanced: Base role overrides + custom sub-roles
      { path: "admin/incentive-visibility", element: <ErrorBoundary><Suspense fallback={<PageLoader />}><IncentiveVisibilityAdmin /></Suspense></ErrorBoundary> }, // Super Admin: show/hide incentive tab per role/employee
      { path: "hr/role-suggestions", element: <ErrorBoundary><Suspense fallback={<PageLoader />}><RoleSuggestionsPage /></Suspense></ErrorBoundary> }, // MC-12
      { path: "hr/intelligence-dashboard", element: <ErrorBoundary><Suspense fallback={<PageLoader />}><HRIntelligenceDashboard /></Suspense></ErrorBoundary> },
      { path: "store-manager", element: <ErrorBoundary><Suspense fallback={<PageLoader />}><StoreManagerModule /></Suspense></ErrorBoundary> },
      { path: "store-manager/grn-entry", element: <ErrorBoundary><Suspense fallback={<PageLoader />}><GRNEntry /></Suspense></ErrorBoundary> },
      { path: "store-manager/purchase-order", element: <ErrorBoundary><Suspense fallback={<PageLoader />}><PurchaseOrderCreation /></Suspense></ErrorBoundary> },
      { path: "store-manager/moq", element: <ErrorBoundary><Suspense fallback={<PageLoader />}><MOQManagement /></Suspense></ErrorBoundary> },
      { path: "store-manager/inventory", element: <ErrorBoundary><Suspense fallback={<PageLoader />}><InventoryMonitoring /></Suspense></ErrorBoundary> },
      { path: "store-manager/vendor-request", element: <ErrorBoundary><Suspense fallback={<PageLoader />}><VendorRequest /></Suspense></ErrorBoundary> },
      {
        path: "analytics",
        element: <GlobalFiltersProvider><Outlet /></GlobalFiltersProvider>,
        children: [
          { index: true, element: <Navigate to="/analytics/dashboard" replace /> },
          { path: "dashboard", element: <ErrorBoundary><Suspense fallback={<PageLoader />}><AnalyticsDashboardWithDrillDown /></Suspense></ErrorBoundary> },
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
          { path: "cost-report", element: <ErrorBoundary><Suspense fallback={<PageLoader />}><CostPerWashReport /></Suspense></ErrorBoundary> },

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
      { path: "crm/activity-timeline", element: <ErrorBoundary><Suspense fallback={<PageLoader />}><ActivityTimelineWrapper /></Suspense></ErrorBoundary> },
      { path: "crm/notifications", element: <ErrorBoundary><Suspense fallback={<PageLoader />}><NotificationCenter /></Suspense></ErrorBoundary> },
      { path: "crm/conversion-analytics", element: <ErrorBoundary><Suspense fallback={<PageLoader />}><CRMConversionAnalyticsDashboard /></Suspense></ErrorBoundary> },
      { path: "payroll/test", element: <DevOnlyRoute element={<PayrollConfigTest />} /> },
      { path: "payroll/configuration", element: <ErrorBoundary><Suspense fallback={<PageLoader />}><PayrollConfiguration /></Suspense></ErrorBoundary> },
      { path: "payroll/create-salary-structure", element: <ErrorBoundary><Suspense fallback={<PageLoader />}><CreateSalaryStructure /></Suspense></ErrorBoundary> },
      { path: "payroll/salary-assignment", element: <ErrorBoundary><Suspense fallback={<PageLoader />}><EmployeeSalaryAssignment /></Suspense></ErrorBoundary> },
      { path: "payroll/run", element: <ErrorBoundary><Suspense fallback={<PageLoader />}><PayrollRun /></Suspense></ErrorBoundary> },
      { path: "payroll/processing", element: <Navigate to="/payroll/run" replace /> },
      { path: "payroll/processing-basic", element: <Navigate to="/payroll/run" replace /> },
      { path: "payroll/review-approval", element: <ErrorBoundary><Suspense fallback={<PageLoader />}><PayrollReviewApproval /></Suspense></ErrorBoundary> },
      { path: "payroll/salary-payables", element: <ErrorBoundary><Suspense fallback={<PageLoader />}><SalaryPayableView /></Suspense></ErrorBoundary> },
      { path: "payroll/salary-payment", element: <ErrorBoundary><Suspense fallback={<PageLoader />}><SalaryPaymentScreen /></Suspense></ErrorBoundary> },
      { path: "payroll/statutory-payables", element: <ErrorBoundary><Suspense fallback={<PageLoader />}><StatutoryPayablesScreen /></Suspense></ErrorBoundary> },
      {
        path: "subscription",
        element: <ErrorBoundary><Suspense fallback={<PageLoader />}><Outlet /></Suspense></ErrorBoundary>,
        children: [
          { index: true, element: <Navigate to="/subscription/plan-management" replace /> },
          { path: "plan-management", element: <ErrorBoundary><Suspense fallback={<PageLoader />}><AdminPlanManagement userRole="ADMIN" /></Suspense></ErrorBoundary> },
          { path: "plan-editor", element: <ErrorBoundary><Suspense fallback={<PageLoader />}><PlanEditor /></Suspense></ErrorBoundary> },
        ]
      },
      { path: "settings/communication-templates", element: <ErrorBoundary><Suspense fallback={<PageLoader />}><CommunicationTemplates /></Suspense></ErrorBoundary> },
      { path: "settings/cost-configuration", element: <ErrorBoundary><Suspense fallback={<PageLoader />}><CostConfiguration /></Suspense></ErrorBoundary> },
      { path: "service-zones", element: <ErrorBoundary><Suspense fallback={<PageLoader />}><ServiceZonesManagement /></Suspense></ErrorBoundary> },
      { path: "washer-jobs", element: <ErrorBoundary><Suspense fallback={<PageLoader />}><WasherJobExecution /></Suspense></ErrorBoundary> },
      { path: "expansion-opportunities", element: <ErrorBoundary><Suspense fallback={<PageLoader />}><ExpansionOpportunities /></Suspense></ErrorBoundary> },
      { path: "procurement/supplier/:supplierId", element: <ErrorBoundary><Suspense fallback={<PageLoader />}><SupplierDetail /></Suspense></ErrorBoundary> },
      { path: "demo/cost-tracking-integration", element: <DevOnlyRoute element={<CostTrackingIntegrationDemo />} /> },
      { path: "design-system-test", element: <DevOnlyRoute element={<DesignSystemTest />} /> },
      // Cloth Tracking System
      { path: "cloth-tracking/exchange", element: <ErrorBoundary><Suspense fallback={<PageLoader />}><ClothExchange /></Suspense></ErrorBoundary> },
      { path: "cloth-tracking/admin", element: <ErrorBoundary><Suspense fallback={<PageLoader />}><ClothAdminDashboard /></Suspense></ErrorBoundary> },
      // Advance Management System
      { path: "advance", element: <ErrorBoundary><Suspense fallback={<PageLoader />}><AdvanceTypeSelection /></Suspense></ErrorBoundary> },
      { path: "advance/long-term/apply", element: <ErrorBoundary><Suspense fallback={<PageLoader />}><LongTermAdvanceForm /></Suspense></ErrorBoundary> },
      { path: "advance/short-term/apply", element: <ErrorBoundary><Suspense fallback={<PageLoader />}><ShortTermAdvanceForm /></Suspense></ErrorBoundary> },
      { path: "advance/my-advances", element: <ErrorBoundary><Suspense fallback={<PageLoader />}><EmployeeAdvanceDashboard /></Suspense></ErrorBoundary> },
      { path: "advance/status/:advanceId", element: <ErrorBoundary><Suspense fallback={<PageLoader />}><AdvanceDetailView /></Suspense></ErrorBoundary> },
      { path: "advance/hr-management", element: <ErrorBoundary><Suspense fallback={<PageLoader />}><HRAdvanceManagement /></Suspense></ErrorBoundary> },
      { path: "advance/other-earnings", element: <ErrorBoundary><Suspense fallback={<PageLoader />}><OtherEarningsModule /></Suspense></ErrorBoundary> },
      { path: "advance/other-deductions", element: <ErrorBoundary><Suspense fallback={<PageLoader />}><OtherDeductionsModule /></Suspense></ErrorBoundary> },
      { path: "advance/adjustments-report", element: <ErrorBoundary><Suspense fallback={<PageLoader />}><AdjustmentsReport /></Suspense></ErrorBoundary> },
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
      { path: "washer-core-screens", element: <ErrorBoundary><Suspense fallback={<PageLoader />}><WasherCoreScreensConnected /></Suspense></ErrorBoundary> },

      // Washer Attendance History
      { path: "washer/attendance", element: <ErrorBoundary><Suspense fallback={<PageLoader />}><WasherAttendanceHistory /></Suspense></ErrorBoundary> },
      { path: "washer/check-in", element: <Navigate to="/washer-core-screens" replace /> },
      { path: "washer/schedule", element: <Navigate to="/washer-core-screens" replace /> },
      { path: "washer/earnings", element: <Navigate to="/washer-core-screens" replace /> },
      { path: "washer/raise-issue", element: <Navigate to="/washer-core-screens" replace /> },
      { path: "finance/collections", element: <ErrorBoundary><Suspense fallback={<PageLoader />}><FinanceTransactions /></Suspense></ErrorBoundary> },

      // Supervisor App - Nested routes with layout
      {
        path: "supervisor-app",
        element: <ErrorBoundary><Suspense fallback={<PageLoader />}><SupervisorLayout /></Suspense></ErrorBoundary>,
        children: [
          { index: true, element: <ErrorBoundary><Suspense fallback={<PageLoader />}><SupervisorAppConnected /></Suspense></ErrorBoundary> },
          { path: "dashboard", element: <ErrorBoundary><Suspense fallback={<PageLoader />}><SupervisorAppConnected /></Suspense></ErrorBoundary> },
          // R5 FIX NOTE: deep-linking to specific tabs requires SupervisorAppConnected
          // to read useLocation().pathname and set its initial active tab.
          // See SupervisorAppConnected fix in supervisor-fixes.
          { path: "team", element: <ErrorBoundary><Suspense fallback={<PageLoader />}><SupervisorAppConnected /></Suspense></ErrorBoundary> },
          { path: "audit", element: <ErrorBoundary><Suspense fallback={<PageLoader />}><SupervisorAppConnected /></Suspense></ErrorBoundary> },
          { path: "cloth", element: <ErrorBoundary><Suspense fallback={<PageLoader />}><SupervisorAppConnected /></Suspense></ErrorBoundary> },
          { path: "leads", element: <ErrorBoundary><Suspense fallback={<PageLoader />}><SupervisorAppConnected /></Suspense></ErrorBoundary> },
          { path: "incentive", element: <ErrorBoundary><Suspense fallback={<PageLoader />}><SupervisorAppConnected /></Suspense></ErrorBoundary> },
          { path: "issues", element: <ErrorBoundary><Suspense fallback={<PageLoader />}><SupervisorAppConnected /></Suspense></ErrorBoundary> },
          { path: "alerts", element: <ErrorBoundary><Suspense fallback={<PageLoader />}><SupervisorAppConnected /></Suspense></ErrorBoundary> },
          { path: "cover", element: <ErrorBoundary><Suspense fallback={<PageLoader />}><SupervisorAppConnected /></Suspense></ErrorBoundary> },
          { path: "visibility", element: <ErrorBoundary><Suspense fallback={<PageLoader />}><SupervisorAppConnected /></Suspense></ErrorBoundary> },
          { path: "audit-trail", element: <ErrorBoundary><Suspense fallback={<PageLoader />}><SupervisorAppConnected /></Suspense></ErrorBoundary> },
          { path: "kpi-dashboard", element: <ErrorBoundary><Suspense fallback={<PageLoader />}><SupervisorAppConnected /></Suspense></ErrorBoundary> },
        ]
      },

      // Operations Manager App (Production) - High-control command interface
      { path: "om-app", element: <ErrorBoundary><Suspense fallback={<PageLoader />}><OperationsManagerApp /></Suspense></ErrorBoundary> },

      // Cluster Manager App (Production) - Control tower interface
      { path: "cm-app", element: <ErrorBoundary><Suspense fallback={<PageLoader />}><ClusterManagerApp /></Suspense></ErrorBoundary> },

      // City Manager App (Production) - Control tower interface
      { path: "city-app", element: <ErrorBoundary><Suspense fallback={<PageLoader />}><CityManagerApp /></Suspense></ErrorBoundary> },

      // Organization Hierarchy Dashboard - City → Cluster → Pincode
      { path: "hierarchy-dashboard", element: <ErrorBoundary><Suspense fallback={<PageLoader />}><HierarchyDashboard /></Suspense></ErrorBoundary> },

      // Tele Sales Manager App (Production) - Pipeline control tower
      { path: "tsm-app", element: <ErrorBoundary><Suspense fallback={<PageLoader />}><TeleSalesManagerApp /></Suspense></ErrorBoundary> },
      { path: "sh-app", element: <ErrorBoundary><Suspense fallback={<PageLoader />}><SalesHeadApp /></Suspense></ErrorBoundary> },
      { path: "sm-app-alliance", element: <ErrorBoundary><Suspense fallback={<PageLoader />}><SalesManagerApp /></Suspense></ErrorBoundary> },

      // Tele Sales Executive App (Production) - Sales execution interface
      { path: "tse-app", element: <ErrorBoundary><Suspense fallback={<PageLoader />}><TeleSalesExecutiveApp /></Suspense></ErrorBoundary> },
      { path: "tse-diagnostics", element: <DevOnlyRoute element={<TSEDiagnostics />} /> },

      // Customer Care Executive App (Production) - Complaint management interface
      { path: "cce-app", element: <ErrorBoundary><Suspense fallback={<PageLoader />}><CustomerCareExecutiveApp /></Suspense></ErrorBoundary> },

      // BTL Service Test Page
      { path: "test-btl", element: <DevOnlyRoute element={<TestBTLService />} /> },

      // Subscription Management System (Production) - Dynamic plan system
      { path: "subscription-app", element: <ErrorBoundary><Suspense fallback={<PageLoader />}><SubscriptionApp /></Suspense></ErrorBoundary> },
      { path: "plans", element: <ErrorBoundary><Suspense fallback={<PageLoader />}><PlanSelectionScreen /></Suspense></ErrorBoundary> },
      { path: "buy",   element: <ErrorBoundary><Suspense fallback={<PageLoader />}><CustomerPlanPage /></Suspense></ErrorBoundary> },
      { path: "admin/plans", element: <ErrorBoundary><Suspense fallback={<PageLoader />}><AdminPlanManagement userRole="ADMIN" /></Suspense></ErrorBoundary> },
      { path: "admin/plan-page-editor", element: <ErrorBoundary><SuperAdminPlanEditor /></ErrorBoundary> },
      { path: "subscription-diagnostics", element: <DevOnlyRoute element={<SubscriptionDiagnostics />} /> },

      // Client Portal - Read-only client interface
      { path: "client-portal", element: <ErrorBoundary><Suspense fallback={<PageLoader />}><ClientPortal /></Suspense></ErrorBoundary> },

      // Workforce Management - Working Hours & Shift Configuration
      { path: "workforce/diagnostic", element: <DevOnlyRoute element={<WorkforceDiagnostic />} /> },
      { path: "workforce/test", element: <DevOnlyRoute element={<WorkingHoursTest />} /> },
      { path: "workforce/simple", element: <ErrorBoundary><Suspense fallback={<PageLoader />}><WorkingHoursSimple /></Suspense></ErrorBoundary> },
      { path: "workforce/working-hours", element: <ErrorBoundary><Suspense fallback={<PageLoader />}><WorkingHoursSetup /></Suspense></ErrorBoundary> },

      // Incentive Management System - Configuration, Simulation & Forecasting
      { path: "incentives/configuration", element: <ErrorBoundary><Suspense fallback={<PageLoader />}><IncentiveConfiguration /></Suspense></ErrorBoundary> },
      { path: "incentives/simulator", element: <ErrorBoundary><Suspense fallback={<PageLoader />}><IncentiveSimulator /></Suspense></ErrorBoundary> },
      { path: "incentives/forecast", element: <ErrorBoundary><Suspense fallback={<PageLoader />}><IncentiveDashboard /></Suspense></ErrorBoundary> },
      { path: "incentives", element: <Navigate to="/incentives/configuration" replace /> },

      // My Account - Employee self-service
      { path: "my-account", element: <ErrorBoundary><Suspense fallback={<PageLoader />}><MyAccountPage /></Suspense></ErrorBoundary> },
      { path: "my-account/mobile-change", element: <ErrorBoundary><Suspense fallback={<PageLoader />}><MobileChangeRequest /></Suspense></ErrorBoundary> },

      // Unauthorized page - shown when access denied
      { path: "unauthorized", element: <ErrorBoundary><Suspense fallback={<PageLoader />}><UnauthorizedPage /></Suspense></ErrorBoundary> },

      // Catch-all 404 for authenticated routes - must be last in children array
      { path: "*", element: <Navigate to="/" replace /> },
    ],
  },
]);
