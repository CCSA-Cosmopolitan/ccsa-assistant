import Image from "next/image"
import cosmo from '@/public/cosmo-svg.svg'


export default function logo() {
  return (
    <div className="flex justify-center items-center bg-transparent dark:bg-transparent">
      <div className="relative rounded-full">
        <Image src={cosmo} alt={'cosmopolitan logo'} width={300} height={300} className=" w-full h-full object-cover" />
      </div>
    </div>
  )
}

