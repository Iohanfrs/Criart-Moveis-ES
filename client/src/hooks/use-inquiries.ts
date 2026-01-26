import { useMutation } from "@tanstack/react-query";
import { api } from "@shared/routes";
import { z } from "zod";
import type { InsertInquiry } from "@shared/schema";

export function useCreateInquiry() {
  return useMutation({
    mutationFn: async (data: InsertInquiry) => {
      // 1. Client-side validation using the schema from routes
      const validated = api.inquiries.create.input.parse(data);

      const res = await fetch(api.inquiries.create.path, {
        method: api.inquiries.create.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validated),
      });

      if (!res.ok) {
        if (res.status === 400) {
          const error = api.inquiries.create.responses[400].parse(await res.json());
          throw new Error(error.message);
        }
        if (res.status === 500) {
           const error = api.inquiries.create.responses[500].parse(await res.json());
           throw new Error(error.message);
        }
        throw new Error("Failed to submit inquiry");
      }

      return api.inquiries.create.responses[201].parse(await res.json());
    },
  });
}
