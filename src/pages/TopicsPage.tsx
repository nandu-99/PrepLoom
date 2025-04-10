import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ChevronRight, Search } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Category } from "@/types/types";
import { backendURL } from "@/data/data";
import SkeletonLoader from "@/components/SkeletonLoader";

function TopicsPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null); 
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [categoryPathId, setCategoryPathId] = useState<string>("");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(`${backendURL}/categories`);
        const data = await response.json();
        setCategories(data);
        setSelectedCategory(location.state?.selectedCategory || data[0]?.id);
        setCategoryPathId(data[0]?.pathId || ""); // Added fallback empty string
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching categories:', error);
        setIsLoading(false);
      }
    };

    fetchCategories();
  }, [location.state?.selectedCategory]);

  const selectedCategoryData = categories.find(
    (c) => c.id === selectedCategory
  );

  const filteredTopics = selectedCategoryData?.topics?.filter((topic) =>
    topic.title.toLowerCase().includes(searchQuery.toLowerCase())
  ) || [];

  if (isLoading) {
    return <SkeletonLoader variant="topics"/>
  }

  if (categories.length === 0) {
    return (
      <div className="max-w-7xl mx-auto p-4 sm:p-6">
        <Card className="max-w-lg mx-auto mt-8 p-6">
          <div className="text-center">
            <h2 className="text-2xl font-semibold mb-4">No Categories Available</h2>
            <p className="text-muted-foreground mb-6">
              We couldn’t fetch any categories at this time. Please try again later.
            </p>
            <Button onClick={() => window.location.reload()}>
              Retry
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6">
      <h1 className="text-2xl sm:text-4xl font-bold mb-6 sm:mb-8">Interview Preparation Hub</h1>
      
      <div className="flex flex-col gap-6">
        <div className="block md:hidden">
          <select
            value={selectedCategory || ""}
            onChange={(e) => {
              const category = categories.find(c => c.id === e.target.value);
              setSelectedCategory(category?.id || null);
              setCategoryPathId(category?.pathId || "");
            }}
            className="w-full p-3 rounded-lg border bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-200"
          >
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.title}
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[250px,1fr] gap-6 sm:gap-8">
          <div className="hidden md:block space-y-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => {
                  setSelectedCategory(category.id);
                  setCategoryPathId(category.pathId);
                }}
                className={`w-full text-left px-4 py-3 rounded-lg flex items-center justify-between gap-3 ${
                  selectedCategory === category.id
                    ? "bg-gray-100 text-gray-900"
                    : "text-gray-50 hover:border"
                }`}
              >
                {category.title}
                <ChevronRight />
              </button>
            ))}
          </div>

          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="relative flex-1 max-w-md w-full">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search topics..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-8 w-full"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
              {filteredTopics.map((topic) => (
                <Card key={topic.id} className="p-4 sm:p-6">
                  <h3 className="text-xl sm:text-2xl font-semibold mb-2">{topic.title}</h3>
                  <p className="text-muted-foreground mb-4 text-sm sm:text-base">
                    {topic.description}
                  </p>
                  <div className="flex flex-wrap gap-2 sm:gap-3">
                    <Button
                      variant="outline"
                      onClick={() =>
                        navigate(`/questions/${categoryPathId}/${topic.pathId}`, {
                          state: { selectedCategory },
                        })
                      }
                      className="mt-2 text-sm sm:text-base flex-1"
                    >
                      Questions
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() =>
                        navigate(`/coding/${categoryPathId}/${topic.pathId}`, {
                          state: { selectedCategory },
                        })
                      }
                      className="mt-2 text-sm sm:text-base flex-1"
                    >
                      Coding
                    </Button>
                    <Button
                      onClick={() =>
                        navigate(`/quiz/${categoryPathId}/${topic.pathId}`, {
                          state: { selectedCategory },
                        })
                      }
                      className="mt-2 text-sm sm:text-base flex-1"
                    >
                      Quiz
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TopicsPage;
