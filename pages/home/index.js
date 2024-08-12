import { Form, Formik, setIn } from "formik";
import { useEffect, useRef, useState } from "react";
import { server } from "@/config/index";
import DrugItem from "@/components/DrugItem";
import MyTextInput from "@/components/MyTextInput";
import InteractionTable from "@/components/InterationTable";
import MyLoader from "@/components/MyLoader";
import styles from "@/styles/Header.module.css";

import Link from "next/link";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import DrugListTable from "@/components/DrugList";

// import {
//   Table,
//   TableRow,
//   TableHead,
// } from  "@/components/ui/Table"

const INTERACTION_EXAMPLE = [
  { id: 1, name: "Aluminum hydroxide" },
  { id: 2, name: "Dolutegravir" },
  { id: 3, name: "Aprepitant" },
  { id: 4, name: "Abacavir" },
  { id: 5, name: "Orlistat" },
  { id: 6, name: "Dexamethasone" },
];

export default function Home() {
  return (
    <>
      {/* <main className="col container mb-5 mt-3">
       <div className="row text-center">
        <h2 className={styles.myheading}>My Drug List</h2>
      </div>

      <div className="row justify-content-md-center my-3">
        <div className="card border-secondary">
          <div className="card-body">
           
          </div>
        </div>
      </div>

      <ul className="list-group row">
        {drugList.map((drug) => (
          <DrugItem key={drug.id} drug={drug} onClick={onDeleteHandler} />
        ))}
      </ul>

      <div className="d-flex justify-content-center my-3">
        <Button className="btn btn-primary px-3" onClick={submitList}>
          Check Interactions
          
        </Button>
      </div> */}

      <MyComponent />
    </>
  );
}

function MyComponent() {
  const [id, setId] = useState(0);
  const [drugList, setDrugList] = useState([]);

  const [interactionTable, setInteractionTable] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [searchResults, setSearchResults] = useState([]);

  const [drugName, setDrugName] = useState("");

  const PopOverRef = useRef(null);

  const fetchDrugName = async (drugName) => {
    try {
      const result = await fetch(`${server}/api/getSimilarDrugs`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          drugName: drugName,
        }),
      });

      const res = await result.json();
      console.log("Similar Drugs: ", res.similarDrugs[0].similarDrugs);
      setSearchResults(res.similarDrugs[0].similarDrugs);
      PopOverRef.current.click();
    } catch (error) {
      console.log("Error occured: ", error);
    }
  };

  const submitList = async () => {
    setIsLoading(true);

    // To api call
    try {
      // console.log("Server: ", server);
      // console.log("Drug List: ", drugList);
      // remove duplicates or empty strings from drugList
      const uniqueDrugs = drugList.filter(
        (drug, index, self) =>
          index === self.findIndex((t) => t.name === drug.name)
      );

      const result = await fetch(`${server}/api/getInteraction`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          drugList: uniqueDrugs,
        }),
      });

      const res = await result.json();
      const interactions = res.interactions;

      if (interactions.length === 0) {
        console.log("No interactions found");
        setIsLoading(false);
        setInteractionTable([
          {
            Drug_A: "No interactions found",
            Drug_B: "",
            Level: "",
            Description: "",
          },
        ]);
        return;
      }

      // set Table
      setInteractionTable(interactions);

      console.log("Interactions: ", interactions);
    } catch (error) {
      console.log("Error occured: ", error);
    }

    setIsLoading(false);
  };

  const onDeleteHandler = (id) => {
    setDrugList(drugList.filter((drug) => drug.id !== id));
  };

  const addDrugHandler = (values) => {
    const drugObj = { id: id, name: values.name };
    const newDrugList = drugList.concat(drugObj);

    setId(id + 1);
    setDrugList(newDrugList);
  };

  const handleResetClick = () => {
    setDrugList([]);
  };

  const handleLoadExampleClick = () => {
    setDrugList(INTERACTION_EXAMPLE);
  };

  const fetchSimilarDrugs = (e, drugName) => {
    e.preventDefault();
    setDrugName(drugName);
    console.log("Searching for drug name");
    if (drugName.length < 2) {
      setSearchResults([]);
      return;
    }
    fetchDrugName(drugName);
  };

  // keep the druglist unique, remove duplicates, empty strings etc
  useEffect(() => {
    const uniqueDrugs = drugList.filter(
      (drug, index, self) =>
        index === self.findIndex((t) => t.name === drug.name && t.name !== "")
    );
    if (JSON.stringify(uniqueDrugs) !== JSON.stringify(drugList)) {
      setDrugList(uniqueDrugs);
    }
  }, [drugList]);

  return (
    <div className="bg-background text-foreground min-h-screen flex flex-col">
      <header className="bg-slate-100/20 text-foreground py-4 px-6 shadow">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <PillIcon className="w-6 h-6" />
            <h1 className="text-2xl font-bold">
            Medication Interaction Checker
            </h1>
          </div>
          <Link href="#" className="text-sm hover:underline" prefetch={false}>
            About
          </Link>
        </div>
      </header>
      <main className="flex-1 container mx-auto py-12 px-4 md:px-6">
        <div className="grid md:grid-cols-2 gap-8 items-start">
          <div className="bg-card rounded-lg shadow p-6 md:p-8 h-full relative">
            <h2 className="text-2xl font-bold mb-4">Check for Interactions</h2>
            <Formik initialValues={{ name: "" }} onSubmit={addDrugHandler}>
              <Form>
                <Input
                  label="Drug Name"
                  name="name"
                  type="text"
                  placeholder="Enter Drug Name"
                  className="p-4"
                  // onchange search for drug name in database
                  value={drugName}
                  onChange={(e) => {
                    fetchSimilarDrugs(e, e.target.value);
                  }}
                />

                {/* Popover */}
                <div
                  className="popover relative bg-gray-800 w-full"
                  ref={PopOverRef}
                >
                  <div className="popover-content">
                    <ul className="list-group absolute bg-[#252528] w-full">
                      {drugName &&
                        searchResults.map((drug, index) => (
                          <li
                            key={index}
                            className="list-group-item border-b-2 border-gray-700 cursor-pointer p-1 pl-2 hover:bg-gray-700"
                            onClick={() => {
                              PopOverRef.current.click();
                              addDrugHandler({ name: drug });
                              setDrugName("");
                            }}
                          >
                            {drug}
                          </li>
                        ))}
                    </ul>
                  </div>
                </div>

                {/* <Table>
                  <TableHead>
                    <TableRow>
                      <th>Similar Drugs</th>
                    </TableRow>
                  </TableHead>
                </Table> */}

                <div className="col-12  mt-4 pl-1 pr-1 flex items-center justify-evenly gap-2">
                  <Button type="submit" className="btn btn-primary w-full">
                    Add Drug
                  </Button>
                  <Button
                    type="Button"
                    className="btn btn-primary mx-2 w-full"
                    onClick={handleResetClick}
                    variant="outline"
                  >
                    Reset List
                  </Button>
                  <Button
                    type="Button"
                    className="btn btn-primary w-full"
                    variant="secondary"
                    onClick={handleLoadExampleClick}
                  >
                    Load Example
                  </Button>
                </div>
                <div className="absolute bottom-0 left-0 p-4 w-full">
                  <Button
                    type="submit"
                    className="btn btn-primary w-full"
                    onClick={submitList}
                  >
                    Check Interactions
                  </Button>
                </div>

                <div className="mt-4">
                  <span className="mt-4 text-xs text-primary/80 p-1 text-justify">
                    - Try searching for a drug name and select from the list of
                    similar drugs.
                  </span>
                  <br />
                  <span className="text-xs text-primary/80 p-1 text-justify">
                    - Or load an example list of drugs.
                  </span>
                </div>
              </Form>
            </Formik>
          </div>
          <div className="bg-card rounded-lg shadow p-6 md:p-8">
            <h2 className="text-2xl font-bold mb-4">Potential Interactions</h2>
            <div className="grid gap-4 gap-y-6">
              <div className="flex items-start gap-4">
                <div className="rounded-full bg-red-500 text-yellow-50 w-10 h-10 flex items-center justify-center">
                  <TriangleAlertIcon className="w-5 h-5" />
                </div>
                <div className="w-[85%]">
                  <h3 className="font-semibold">Medication A + Medication B</h3>
                  <p className="text-muted-foreground ">
                    Severe interaction: May cause serious adverse effects. Avoid
                    concomitant use.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="rounded-full bg-yellow-500 text-yellow-50 w-10 h-10 flex items-center justify-center">
                  <TriangleAlertIcon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold">Medication C + Medication D</h3>
                  <p className="text-muted-foreground">
                    Moderate interaction: Monitor closely and adjust dosages if
                    necessary.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="rounded-full bg-green-500 text-green-50 w-10 h-10 flex items-center justify-center">
                  <CheckIcon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold">Medication E + Medication F</h3>
                  <p className="text-muted-foreground">
                    No significant interaction expected.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <main className="flex-1 container mx-auto mt-0 pt-0 py-12 px-4 md:px-6">
        {drugList && drugList.length !== 0 && (
          <>
            <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight m-6 mt-16">
              Drug List
              <hr className="border-1.5 border-primary w-1/3 mt-2" />
            </h3>

            <DrugListTable
              drugList={drugList}
              onDeleteHandler={onDeleteHandler}
            />
          </>
        )}
        <div className="d-flex justify-content-center">
          {isLoading && <MyLoader />}
        </div>

        {!isLoading && interactionTable.length !== 0 && (
          <>
            <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight m-6 mt-16">
              Drug Interactions
              <hr className="border-1.5 border-primary w-1/3 mt-2" />
            </h3>
            <InteractionTable interactionTable={interactionTable} />
          </>
        )}

        {!isLoading && interactionTable.length !== 0 && (
          <blockquote className="mt-6 border-l-2 pl-6 italic">
            <p className=" text-sm ">
              *Note:{" "}
              <span className="font-semibold underline underline-offset-4 text-muted-foreground">
                Unknown interaction means there might be an interaction between
                the drugs but with unknown severity.
              </span>
            </p>
          </blockquote>
        )}
      </main>

      <footer className="bg-muted text-muted-foreground py-4 px-6 text-sm">
        <div className="container mx-auto flex items-center justify-between">
          <p>
            &copy; 2023 Medication Interaction Checker. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link href="#" className="hover:underline" prefetch={false}>
              Privacy Policy
            </Link>
            <Link href="#" className="hover:underline" prefetch={false}>
              Terms of Service
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

function CheckIcon(props) {
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
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
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
  );
}

function TriangleAlertIcon(props) {
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
      <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3" />
      <path d="M12 9v4" />
      <path d="M12 17h.01" />
    </svg>
  );
}
