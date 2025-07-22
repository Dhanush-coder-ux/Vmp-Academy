import ContactForm from "@/components/ContactForm"
import Hero from "@/components/Hero"
import StatsSection from "@/components/StatsSection"
import Testimonials from "@/components/Testimonials"
import WhyChooseUs from "@/components/WhyChooseUs"

const Page = async () => {
    

  return (
    <main>
      <Hero/>
      <WhyChooseUs/>
      <StatsSection/>
      <Testimonials/>
      <ContactForm/>
  
    </main>
  )
}

export default Page