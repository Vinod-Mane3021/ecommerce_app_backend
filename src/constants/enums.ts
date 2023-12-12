enum UserRoles {
  Member = "ROLE MEMBER",
  Merchant = "ROLE MERCHANT",
  Admin = "ROLE ADMIN",
}

enum MerchantStatus {
  Rejected = "Rejected",
  Approved = "Approved",
  WaitingApproval = "Waiting Approval",
}

enum CartItemStatus {
  Processing = "Processing",
  Shipped = "Shipped",
  Delivered = "Delivered",
  Cancelled = "Cancelled",
  NotProcessed = "Not processed",
}

enum ReviewStatus {
  Rejected = "Rejected",
  Approved = "Approved",
  WaitingApproval = "Waiting Approval",
}

enum EmailProvider {
  Email = "Email",
  Google = "Google",
  Facebook = "Facebook",
}

const JWT_COOKIE = "x-jwt-cookie";

export { UserRoles, MerchantStatus, CartItemStatus, ReviewStatus, EmailProvider, JWT_COOKIE, };
