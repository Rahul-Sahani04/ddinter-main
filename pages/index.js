/**
 * v0 by Vercel.
 * @see https://v0.dev/t/t2VTdsUAsHD
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"



export default function Component() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="sticky top-0 z-30 border-b bg-background">
        <div className="container mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="#" className="flex items-center gap-2 no-underline text-primary" prefetch={false}>
            <PillIcon className="h-6 w-6 text-primary" />
            <span className="text-lg font-semibold ">Drug Interaction Checker</span>
          </Link>
          <nav className="hidden space-x-4 md:flex">
            <Link
              href="/home"
              className="rounded-md no-underline px-3 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-foreground"
              prefetch={false}
            >
              Check Interactions
            </Link>
            <Link
              href="/"
              className="rounded-md no-underline px-3 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-foreground"
              prefetch={false}
            >
              About
            </Link>
            <Link
              href="#resources"
              className="rounded-md no-underline px-3 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-foreground"
              prefetch={false}
            >
              Resources
            </Link>
            {/* <Link
              href="#"
              className="rounded-md no-underline px-3 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-foreground"
              prefetch={false}
            >
              Contact
            </Link> */}
          </nav>
          <Button variant="outline" size="sm" className="md:hidden">
            <MenuIcon className="h-5 w-5" />
            <span className="sr-only">Toggle menu</span>
          </Button>
        </div>
      </header>
      <main className="flex-1">
        <section className="bg-background py-20">
          <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 items-center">
              <div>
                <h1 className="text-4xl font-bold text-foreground">Avoid Dangerous Drug Interactions</h1>
                <p className="mt-4 text-lg text-muted-foreground">
                  Our drug interaction checker helps you identify potential interactions between your medications,
                  ensuring your safety and well-being.
                </p>
                <Link href="/home" prefetch={false}>
                  <Button variant="outline" size="lg" className="mt-8 ">
                    Check for Interactions
                  </Button>
                </Link>
              </div>
              <div className="flex justify-center">
                <Image
                  src={"/assets/illustration.png"}
                  alt="Drug Interaction Checker"
                  width={500}
                  height={400}
                  className="max-w-full"
                  style={{ aspectRatio: "400/400", objectFit: "contain",  }}
                />
              </div>
            </div>
          </div>
        </section>
        <section className="py-16">
          <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold">How It Works</h2>
            <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-3">
              <div className="flex flex-col items-center">
                <SearchIcon className="h-12 w-12 text-primary" />
                <h3 className="mt-4 text-xl font-semibold">Search Medications</h3>
                <p className="mt-2 text-center text-muted-foreground">
                  Enter the medications you&apos;re taking, and our system will check for potential interactions.
                </p>
              </div>
              <div className="flex flex-col items-center">
                <InfoIcon className="h-12 w-12 text-primary" />
                <h3 className="mt-4 text-xl font-semibold">Get Detailed Information</h3>
                <p className="mt-2 text-center text-muted-foreground">
                  Receive detailed information about the severity and potential consequences of any identified
                  interactions.
                </p>
              </div>
              <div className="flex flex-col items-center">
                <FileWarningIcon className="h-12 w-12 text-primary" />
                <h3 className="mt-4 text-xl font-semibold">Stay Safe</h3>
                <p className="mt-2 text-center text-muted-foreground">
                  Use our recommendations to make informed decisions about your medication regimen and avoid dangerous
                  interactions.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="bg-muted py-16">
          <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold" id="resources">Featured Resources</h2>
            <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            <Card className="relative">
                <CardHeader>
                  <CardTitle>Understanding Drug Interactions</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Learn about the different types of drug interactions and how to identify them.
                  </p>
                </CardContent>
                <CardFooter className="pt-6">
                <Link href="https://www.sps.nhs.uk/articles/understanding-drug-interactions/#:~:text=Drug%20interactions%20occur%20when%20the,pharmacodynamic%20interactions%20and%20pharmacokinetic%20interactions." className="text-primary underline absolute bottom-4 pt-4" prefetch={false} target="_blank" rel="noopener noreferrer">
                    Read More
                  </Link>
                </CardFooter>
              </Card>
              <Card className="relative">
                <CardHeader>
                  <CardTitle>Medication Safety Tips</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Discover practical tips to ensure the safe use of your medications.
                  </p>
                </CardContent>
                <CardFooter className="pt-6">
                <Link href="https://www.google.com/search?client=opera-gx&q=Medication+Safety+Tips&sourceid=opera&ie=UTF-8&oe=UTF-8" className="text-primary underline absolute bottom-4 pt-4" prefetch={false} target="_blank" rel="noopener noreferrer">
                    Read More
                  </Link>
                </CardFooter>
              </Card>
              <Card className="relative">
                <CardHeader>
                  <CardTitle>Frequently Asked Questions</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Get answers to common questions about drug interactions and medication safety.
                  </p>
                </CardContent>
                <CardFooter className="pt-6">
                  <Link href="https://www.fda.gov/drugs/resources-drugs/drug-interactions-what-you-should-know" className="text-primary underline absolute bottom-4 pt-4" prefetch={false} target="_blank" rel="noopener noreferrer">
                    Read More
                  </Link>
                </CardFooter>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <footer className="bg-background py-8">
        <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div className="flex items-center gap-2">
              <PillIcon className="h-6 w-6 text-primary" />
              <span className="text-lg font-semibold">Drug Interaction Checker</span>
            </div>
            <div className="flex gap-4">
              <Link href="#" className="text-muted-foreground hover:text-foreground" prefetch={false}>
                Privacy Policy
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground" prefetch={false}>
                Terms of Service
              </Link>
              {/* <Link href="#" className="text-muted-foreground hover:text-foreground" prefetch={false}>
                Contact Us
              </Link> */}
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

function FileWarningIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
      <path d="M12 9v4" />
      <path d="M12 17h.01" />
    </svg>
  )
}


function InfoIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M12 16v-4" />
      <path d="M12 8h.01" />
    </svg>
  )
}


function MenuIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  )
}


function PillIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m10.5 20.5 10-10a4.95 4.95 0 1 0-7-7l-10 10a4.95 4.95 0 1 0 7 7Z" />
      <path d="m8.5 8.5 7 7" />
    </svg>
  )
}


function SearchIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  )
}