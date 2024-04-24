import { useQuery } from "@tanstack/react-query";
import { getUser } from "./handler";

export const useGetUser = () =>
  useQuery({
    queryKey: ["user"],
    queryFn: async () => await getUser(),
  });
