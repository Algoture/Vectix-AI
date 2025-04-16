"use client"
import { Card, CardContent } from '@/components/ui/card'
import React from 'react'
import Image from 'next/image'
import Webcam from 'react-webcam'

function TakeInterview() {
  

  return (
    <>
      <div className="flex flex-wrap justify-center gap-6">
  <Card className="hover:border-primary transition-colors duration-300 h-fit w-xl rounded-3xl">
    <CardContent className="text-center flex flex-col items-center"> 
      <div className="flex flex-col items-center justify-center">
        <Image src="/ai-avatar.png" width={65} height={54} alt='ai'>
        </Image>
      </div>
    </CardContent>
  </Card>

  <Card className="hover:border-primary transition-colors duration-300 h-fit w-xl rounded-3xl">
    <CardContent className="text-center flex flex-col items-center"> 
      <div className="flex flex-col items-center justify-center">
      <Webcam
      audio={false}
      screenshotFormat="image/jpeg"
      className="rounded-md shadow-lg w-[480px]"
    />
       
      </div>
    </CardContent>
  </Card>
</div>

    </>
  )
}

export default TakeInterview