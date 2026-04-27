
import QuestionCard from "@/components/cards/QuestionCard";
import HomeFilter from "@/components/filters/HomeFilter";
import LocalSearch from "@/components/search/LocalSearch";
import { Button } from "@/components/ui/button";
import ROUTES from "@/constants/routes";
import { getQuestions } from "@/lib/actions/question.action";

import Link from "next/link";



interface SearchParams{
  searchParams:Promise<{[key:string]:string}>
}
const Home =async ({searchParams}:SearchParams) => {

  // const result=await test();

  
  

  const { page, pageSize, query, filter } = await searchParams;

  // const filteredQuestions=questions.filter((question)=>question.title.toLowerCase().includes(query?.toLowerCase()))
  // const filteredQuestions=questions.filter((question)=>{
  //   const matchQuery=question.title.toLowerCase().includes(query.toLowerCase())

  //   const matchFilter=filter?question.tags[0].name.toLowerCase().includes(filter.toLowerCase()):true
    
  //   return matchQuery && matchFilter;
  // });
  const { success, data, error } = await getQuestions({
    page: Number(page) || 1,
    pageSize: Number(pageSize) || 10,
    query: query || "",
    filter: filter || "",
  });

  const { questions } = data || {};


  
  return<>
  <section className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">

   <h1 className="h1-bold text-dark100_light900">All Questions</h1>
   <Button className="primary-gradient min-h-[46px] !text-light-900  px-4 py-3 " asChild>
    <Link href={ROUTES.ASK_QUESTION}>Ask a Question</Link>
    </Button> 
  </section>

  <section className="mt-11">
    <LocalSearch  imgSrc="/icons/search.svg"
    placeholder="Search questions..."
    otherClasses="flex-1"
    route='/'
    />
  </section>
  <HomeFilter />
  {/* <div className="mt-10 flex w-full flex-col gap-6">
   {filteredQuestions.map((question) => (
     <QuestionCard key={question._id} question={question} />
   ))}
  </div> */}
  {success ? (
        <div className="mt-10 flex w-full flex-col gap-6">
          {questions && questions.length > 0 ? (
            questions.map((question) => (
              <QuestionCard key={question._id} question={question} />
            ))
          ) : (
            <div className="mt-10 flex w-full items-center justify-center">
              <p className="text-dark400_light700">No questions found</p>
            </div>
          )}
        </div>
      ) : (
        <div className="mt-10 flex w-full items-center justify-center">
          <p className="text-dark400_light700">
            {error?.message || "Failed to fetch questions"}
          </p>
        </div>
      )}
  </>
}

export default Home;
