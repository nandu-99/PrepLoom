import { Card, CardContent, CardFooter } from "./ui/card";

function SkeletonLoader({ variant = "default" }) {
  const renderDefaultSkeleton = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[...Array(3)].map((_, index) => (
        <Card key={index} className="flex flex-col justify-between overflow-hidden">
          <div className="aspect-video bg-secondary animate-pulse" />
          <CardContent className="p-4">
            <div className="h-6 bg-secondary animate-pulse mb-2 rounded" />
            <div className="h-4 bg-secondary animate-pulse rounded mb-3" />
            <div className="flex flex-wrap gap-2">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-5 w-16 bg-secondary animate-pulse rounded" />
              ))}
            </div>
          </CardContent>
          <CardFooter className="p-2 pt-0 flex justify-between">
            <div className="h-6 w-12 bg-secondary animate-pulse rounded" />
            <div className="flex gap-2">
              <div className="h-6 w-6 bg-secondary animate-pulse rounded-full" />
              <div className="h-6 w-6 bg-secondary animate-pulse rounded-full" />
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  );

  const renderRoadmapSkeleton = () => (
    <div className="grid gap-6">
      {[...Array(3)].map((_, index) => (
        <Card key={index} className="p-6">
          <div className="h-8 bg-secondary animate-pulse mb-2 rounded w-1/2" /> 
          <div className="h-4 bg-secondary animate-pulse rounded mb-4 w-3/4" /> 
          <div className="flex flex-wrap gap-2 mb-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-5 w-20 bg-secondary animate-pulse rounded" /> 
            ))}
          </div>
          <div className="h-10 w-40 bg-secondary animate-pulse rounded" /> 
        </Card>
      ))}
    </div>
  );

  const renderSidebarSkeleton = () => (
    <>
      <div className="md:hidden mb-6">
        <div className="h-10 w-full bg-secondary animate-pulse rounded" />
      </div>

      <div className="hidden md:flex md:flex-col w-full h-fit mb-6 space-y-2">
        {[...Array(3)].map((_, index) => (
          <div
            key={index}
            className="h-12 w-full bg-secondary animate-pulse rounded"
          />
        ))}
      </div>
    </>
  );

  const renderInterviewSkeleton = () => (
    <div className="max-w-5xl mx-auto p-6">
      {/* Header Card */}
      <Card className="mb-8">
        <div className="flex flex-row items-center justify-between p-6 space-y-0 pb-4">
          <div className="flex items-center gap-4">
            <div className="h-10 w-10 bg-secondary animate-pulse rounded" /> {/* Back button */}
            <div className="h-8 w-64 bg-secondary animate-pulse rounded" /> {/* Title */}
          </div>
        </div>
        <CardContent className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <div className="h-10 w-full bg-secondary animate-pulse rounded" /> {/* Search bar */}
            </div>
            <div className="h-10 w-[180px] bg-secondary animate-pulse rounded" /> {/* Difficulty select */}
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end mb-4">
        <div className="h-10 w-32 bg-secondary animate-pulse rounded" />
      </div>

      <div className="space-y-4">
        {[...Array(3)].map((_, index) => (
          <div key={index} className="border rounded-md">
            <div className="flex justify-between items-center p-4">
              <div className="flex justify-between w-full mr-5">
                <div className="h-6 w-3/4 bg-secondary animate-pulse rounded" />
                <div className="h-5 w-16 bg-secondary animate-pulse rounded" /> 
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderTopicsSkeleton = () => (
    <div className="max-w-7xl mx-auto p-4 sm:p-6">
      <div className="h-8 w-64 bg-secondary animate-pulse mb-6 sm:mb-8 rounded" /> {/* Page title */}
      <div className="flex flex-col gap-6">
        {/* Mobile Dropdown */}
        <div className="block md:hidden">
          <div className="h-10 w-full bg-secondary animate-pulse rounded" />
        </div>

        {/* Sidebar and Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-[250px,1fr] gap-6 sm:gap-8">
          {/* Desktop Sidebar */}
          <div className="hidden md:block space-y-2">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="h-12 w-full bg-secondary animate-pulse rounded" />
            ))}
          </div>

          {/* Main Content */}
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="h-10 w-full max-w-md bg-secondary animate-pulse rounded" /> {/* Search bar */}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
              {[...Array(4)].map((_, index) => (
                <Card key={index} className="p-4 sm:p-6">
                  <div className="h-6 w-3/4 bg-secondary animate-pulse mb-2 rounded" /> {/* Topic title */}
                  <div className="h-4 w-full bg-secondary animate-pulse mb-4 rounded" /> {/* Description */}
                  <div className="flex flex-wrap gap-2 sm:gap-3">
                    <div className="h-10 w-1/3 bg-secondary animate-pulse rounded flex-1" /> {/* Button 1 */}
                    <div className="h-10 w-1/3 bg-secondary animate-pulse rounded flex-1" /> {/* Button 2 */}
                    <div className="h-10 w-1/3 bg-secondary animate-pulse rounded flex-1" /> {/* Button 3 */}
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderQuizSkeleton = () => (
    <div className="p-4 max-w-2xl mx-auto">
      {/* Header */}
      <div className="flex flex-row items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <div className="h-10 w-10 bg-secondary animate-pulse rounded" /> {/* Back button */}
          <div className="h-8 w-64 bg-secondary animate-pulse rounded" /> {/* Title */}
        </div>
      </div>
  
      {/* Main Quiz Card */}
      <div className="rounded-lg shadow-md p-8 space-y-6">
        {/* Question Info */}
        <div className="flex justify-between items-center">
          <div className="h-6 w-32 bg-secondary animate-pulse rounded" /> {/* Question number */}
          <div className="flex items-center gap-4">
            <div className="h-6 w-6 bg-secondary animate-pulse rounded-full" /> {/* Flag */}
            <div className="h-6 w-16 bg-secondary animate-pulse rounded" /> {/* Timer */}
          </div>
        </div>
  
        {/* Progress Bar */}
        <div className="h-2 w-full bg-secondary animate-pulse rounded" />
  
        {/* Question and Options */}
        <div className="space-y-4">
          <div className="h-8 w-3/4 bg-secondary animate-pulse rounded" /> {/* Question */}
          {[...Array(4)].map((_, index) => (
            <div key={index} className="h-12 w-full bg-secondary animate-pulse rounded" /> /* Options */
          ))}
        </div>
  
        {/* Navigation Buttons */}
        <div className="flex justify-between">
          <div className="h-10 w-24 bg-secondary animate-pulse rounded" /> {/* Previous */}
          <div className="h-10 w-24 bg-secondary animate-pulse rounded" /> {/* Next */}
        </div>
      </div>
  
      {/* Question Navigation */}
      <div className="mt-6 rounded-lg shadow-md p-4">
        <div className="flex flex-wrap gap-2">
          {[...Array(10)].map((_, index) => (
            <div key={index} className="h-8 w-8 bg-secondary animate-pulse rounded-full" /> /* Question dots */
          ))}
        </div>
      </div>
    </div>
  );

  const renderLearningPathSkeleton = () => (
    <div className="bg-gradient-to-b from-background to-secondary/20 min-h-screen">
      <div className="max-w-6xl mx-auto p-6">
        {/* Header Section */}
        <div className="flex flex-col gap-10 md:flex-row items-center justify-between mb-8 bg-card p-6 rounded-lg shadow-lg">
          <div className="space-y-2">
            <div className="h-10 w-64 bg-secondary animate-pulse rounded" /> {/* Phase Title */}
            <div className="h-4 w-96 bg-secondary animate-pulse rounded" /> {/* Description */}
          </div>
          <div className="h-10 w-32 bg-secondary animate-pulse rounded" /> {/* Back Button */}
        </div>
  
        {/* Topics/Lessons Section */}
        <div className="flex flex-col gap-5">
          {[...Array(3)].map((_, index) => (
            <div key={index} className="p-8 bg-card rounded-lg shadow-md border">
              <div className="flex items-center gap-2 mb-4">
                <div className="h-5 w-5 bg-secondary animate-pulse rounded" /> {/* Book Icon */}
                <div className="h-6 w-48 bg-secondary animate-pulse rounded" /> {/* Topic Name */}
              </div>
  
              <div className="grid md:grid-cols-2 gap-6">
                {/* Key Topics */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <div className="h-4 w-4 bg-secondary animate-pulse rounded" /> {/* Code Icon */}
                    <div className="h-4 w-24 bg-secondary animate-pulse rounded" /> {/* Key Topics Label */}
                  </div>
                  <ul className="space-y-2">
                    {[...Array(3)].map((_, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <div className="h-6 w-6 bg-secondary animate-pulse rounded-full" /> {/* Number Circle */}
                        <div className="h-4 w-3/4 bg-secondary animate-pulse rounded" /> {/* Topic Text */}
                      </li>
                    ))}
                  </ul>
                </div>
  
                {/* Resources and Practice Task */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <div className="h-4 w-4 bg-secondary animate-pulse rounded" /> {/* Link Icon */}
                    <div className="h-4 w-32 bg-secondary animate-pulse rounded" /> {/* Resources Label */}
                  </div>
                  <ul className="space-y-2">
                    {[...Array(2)].map((_, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <div className="h-4 w-40 bg-secondary animate-pulse rounded" /> {/* Resource Link */}
                        <div className="h-4 w-4 bg-secondary animate-pulse rounded" /> {/* Chevron */}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6 p-4 bg-secondary/50 rounded-lg border border-border">
                    <div className="h-4 w-24 bg-secondary animate-pulse rounded mb-2" /> {/* Practice Task Label */}
                    <div className="h-4 w-full bg-secondary animate-pulse rounded" /> {/* Practice Task Text */}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  switch (variant) {
    case "roadmap":
      return renderRoadmapSkeleton();
    case "sidebar":
      return renderSidebarSkeleton();
    case "interview":
      return renderInterviewSkeleton();
    case "topics":
      return renderTopicsSkeleton();
    case "quiz":
        return renderQuizSkeleton();
    case "learning":
        return renderLearningPathSkeleton();
    default:
      return renderDefaultSkeleton();
  }
}

export default SkeletonLoader;
