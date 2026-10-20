import { redirect } from "next/navigation";

export default function EmployersPage() {
  redirect("/dashboard/candidate?tab=employers");
}
