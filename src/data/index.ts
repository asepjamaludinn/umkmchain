import { umkmUsers, regulatorUsers } from "./users";
import { umkmData } from "./umkm/umkm-data";
import { reviewData } from "./reviews/review-data";
import { auditHistory } from "./audit/audit-history";
import {
  dashboardStats,
  monthlyStats,
  sectorStats,
} from "./stats/dashboard-stats";

export const mockUsers = {
  umkm: umkmUsers,
  regulator: regulatorUsers,
};

export const mockUMKMData = umkmData;
export const mockReviewData = reviewData;
export const mockAuditHistory = auditHistory;
export const mockDashboardStats = dashboardStats;
export const mockMonthlyStats = monthlyStats;
export const mockSectorStats = sectorStats;
