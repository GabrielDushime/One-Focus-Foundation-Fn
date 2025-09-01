'use client'

import HeroSection from './HomePage/HeroSection'
import AboutSection from './HomePage/AboutSection'
import ProgramsSection from './HomePage/ProgramsSection'
import EventsSection from './HomePage/EventsSection'
import GetInvolvedSection from './HomePage/GetInvolvedSection'
import SupportSection from './HomePage/SupportSection'
import AnnualReportSection from './HomePage/AnnualReportSection'
import BottomSections from './HomePage/BottomSections'

export default function Home() {

  return (
    <>
      <HeroSection />
      <AboutSection />
      <SupportSection />
      <AnnualReportSection />
      <BottomSections/>
    </>
  )
}