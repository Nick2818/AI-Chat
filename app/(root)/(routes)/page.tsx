import { Categories } from "@/components/categories";
import { Companions } from "@/components/companions";
import { Searchinput } from "@/components/search-input";
import prismadb from "@/lib/prismadb";

interface RootPageProps {
  searchParams: {
    categoryID: string;
    name: string;
  };
}

const RootPage = async ({ searchParams }: RootPageProps) => {
  const data = await prismadb.companion.findMany({
    where: {
      categoryId: searchParams.categoryID,
      name: {
        search: searchParams.name,
      },
    },

    orderBy: {
      createdAt: "desc",
    },

    include: {
      _count: {
        select: {
          messages: true,
        },
      },
    },
  });

  const categories = await prismadb.category.findMany();

  return (
    <div className="h-full p-4 space-y-2">
      <Searchinput />
      <Categories data={categories} />
      <Companions data={data} />
    </div>
  );
};

export default RootPage;
