import IntroSection from "../components/IntroSection"
import SubSection from "../components/SubSection"
import clsx from 'clsx'
import { Play } from "@next/font/google"

const play = Play({
  subsets: ['latin'],
  weight: ['400', '700']
})

export default function Home() {
  return (
    <main>
      <div className={clsx("flex flex-col", play.className)}>
        <IntroSection/>
        <SubSection/>
      </div>
    </main>
  );
}
