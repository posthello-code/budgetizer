"use client";
import { useRouter } from "next/navigation";

export default function Page(options: { params: { id: String } }) {
  const router = useRouter();
  router.push("/budgets?id=" + options.params.id);
}
