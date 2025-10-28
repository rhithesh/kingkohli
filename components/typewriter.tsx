import Typewriter from "@/components/fancy/text/typewriter"

export default function Preview() {
  return (
    <div className=" w-[430px] h-full   text-4xl mx-[150px]">
      <p className="whitespace-pre-wrap flex flex-col" >

        <a href="https://www.instagram.com/virat.kohli/?hl=en" target="_blank">
        <span>virat here,</span>


        </a>
        <Typewriter
          text={[
            "happily married to Anushka",
            "2 beautiful kids",
            "and love playing cricket",
            "talk to me mate "
          ]}
          speed={70}
          className="text-red-500 text-pretty"
          waitTime={1500}
          deleteSpeed={40}
          cursorChar={"_"}
        />
      </p>
    </div>
  )
}
