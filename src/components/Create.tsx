import { useEffect, useRef, useState, FormEvent } from "react";
import { inputs } from "../constants";
import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Button,
  Input,
  Modal,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import jsPDF from "jspdf";
import "../css/Create.css";
import html2canvas from "html2canvas";
import {
  ChevronDown,
  CornerUpLeft,
  Github,
  LinkIcon,
  Linkedin,
  Mail,
  PhoneCall,
} from "lucide-react";

type Info = {
  [key: string]: any[];
};

const Create = () => {
  const [info, setInfo] = useState<Info>({});
  const [isDuplicate, setIsDuplicate] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const pdfRef = useRef<HTMLDivElement>(null);

  const handleSubmit = (event: FormEvent, title: string) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget as HTMLFormElement);
    const data = Object.fromEntries(formData.entries());
    let duplicate = false;

    const hasDuplicate = (array: any[], newData: any) => {
      return array.some((item) => {
        return Object.keys(item).every((key) => item[key] === newData[key]);
      });
    };

    if (
      title !== "Projects" &&
      title !== "Experience" &&
      info[title] &&
      info[title].length > 0
    ) {
      duplicate = true;
      setIsDuplicate(true);
    } else if (info[title] && hasDuplicate(info[title], data)) {
      duplicate = true;
      setIsDuplicate(true);
    } else {
      setIsDuplicate(false);
    }

    if (!duplicate) {
      setInfo((prev) => {
        const existingData = prev[title] || [];
        return {
          ...prev,
          [title]: [...existingData, data],
        };
      });
      onOpen();
    }
  };

  useEffect(() => {
    console.log(info, isDuplicate);
  }, [info, isDuplicate]);

  const generatePDF = () => {
    const pdfEl = pdfRef.current;

    if (!pdfEl) {
      console.error("PDF element reference is null");
      return;
    }

    const doc = new jsPDF();

    html2canvas(pdfEl).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const imgProps = doc.getImageProperties(imgData);

      const pdfWidth = doc.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      doc.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      doc.save("cv.pdf");
    });
  };

  return (
    <section>
      <Button
        as={Link}
        to="/"
        width={"fit-content"}
        leftIcon={<CornerUpLeft width={"1em"} height={"1em"} />}
      >
        <span>Back</span>
      </Button>
      <h1>Start by filling out your info</h1>
      <div>
        <Modal isOpen={isOpen} onClose={onClose} isCentered={true}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader textAlign={"center"}>
              {isDuplicate
                ? "Duplicate item detected"
                : "Item successfully added"}
            </ModalHeader>
            <Button onClick={onClose}>Close</Button>
          </ModalContent>
        </Modal>
        <Accordion allowToggle>
          {inputs.map((input, index) => (
            <AccordionItem
              key={index}
              borderBlock={"none"}
              bg={"white"}
              rounded={"lg"}
              marginTop={5}
            >
              <h2>
                <AccordionButton
                  padding={4}
                  color={"hsl(60, 18%, 14%);"}
                  fontWeight={"bold"}
                  _hover={{
                    bg: "hsl(254, 100%, 50%)",
                    color: "white",
                    rounded: "lg",
                    transition: "background 0.2s ease-in-out",
                  }}
                >
                  <span>{input.title}</span>
                  <ChevronDown />
                </AccordionButton>
              </h2>
              <AccordionPanel display={"flex"} flexDirection={"column"} gap={4}>
                <form
                  onSubmit={(event) => handleSubmit(event, input.title)}
                  style={{ display: "flex", flexDirection: "column", gap: 10 }}
                >
                  {input.inputs.map((field, idx) => (
                    <Input
                      key={idx}
                      name={field.name}
                      type={field.type}
                      placeholder={field.label}
                    />
                  ))}
                  <Button
                    onClick={onOpen}
                    type="submit"
                    variant="outline"
                    size="md"
                    rounded={"full"}
                    background={"white"}
                  >
                    Add Item
                  </Button>
                </form>
              </AccordionPanel>
            </AccordionItem>
          ))}
        </Accordion>
        <h2
          style={{
            margin: 20,
            fontWeight: "bold",
            fontSize: "1.5rem",
            color: "hsl(254, 100%, 50%)",
            textAlign: "left",
          }}
        >
          Result:
        </h2>
        {info && (
          <div
            ref={pdfRef}
            className="cv-container"
            style={{
              backgroundColor: "white",
              padding: 20,
              margin: 20,
              display: "flex",
              gap: 10,
              flexDirection: "column",
            }}
          >
            <div className="social">
              {info.PersoInfo &&
                info.PersoInfo.map((item, index) => (
                  <div key={index}>
                    <h1>{item.fullName}</h1>
                    <div className="social-links">
                      <p>
                        <span>
                          <Mail strokeWidth={1.5} width={20} height={20} />{" "}
                        </span>{" "}
                        <span>{item.email} </span>
                      </p>
                      <p>
                        <span>
                          <PhoneCall strokeWidth={1.5} width={20} height={20} />
                        </span>{" "}
                        <span>{item.phoneNumber}</span>
                      </p>
                      <p>
                        <span>
                          <Github strokeWidth={1.5} width={20} height={20} />{" "}
                        </span>
                        <span>{item.gitHubProfile} </span>
                      </p>
                      <p>
                        <span>
                          <Linkedin strokeWidth={1.5} width={20} height={20} />
                        </span>{" "}
                        <span>{item.linkedInProfile}</span>
                      </p>
                    </div>
                  </div>
                ))}
            </div>
            <div className="summary">
              <h2 className="main-heading">Summary</h2>
              <div className="line"></div>
              {info.PersoInfo &&
                info.PersoInfo.map((item, index) => (
                  <p key={index}>{item.summary}</p>
                ))}
            </div>
            <div className="experiences">
              <h2 className="main-heading">Experiences</h2>
              <div className="line"></div>
              {info.Experience &&
                info.Experience.map((exp, index) => (
                  <div key={index}>
                    <h3>
                      {exp.jobTitle} | {exp.company} | {exp.location} |{" "}
                      {exp.startDate} - {exp.endDate}
                    </h3>
                    <p>{exp.responsibilitiesAndAchievements}</p>
                  </div>
                ))}
            </div>

            <div className="education">
              <h2 className="main-heading">Education</h2>
              <div className="line"></div>
              {info.Education &&
                info.Education.map((edu, index) => (
                  <div key={index}>
                    <h3>
                      {edu.degree} at {edu.university}
                    </h3>
                  </div>
                ))}
            </div>
            <div className="projects">
              <h2 className="main-heading">Projects</h2>
              <div className="line"></div>
              {info.Projects &&
                info.Projects.map((project, index) => (
                  <div className={"project"} key={index}>
                    <h3>
                      {project.projectTitle}{" "}
                      <a href={project.link}>
                        {" "}
                        <LinkIcon width={20} height={20} />
                      </a>
                    </h3>
                    <p>
                      <span style={{ fontWeight: "bold" }}>Tech stack</span>:{" "}
                      {project.technologiesUsed}
                    </p>
                    <p>{project.description}</p>
                  </div>
                ))}
            </div>
            <div className="skills">
              <h2 className="main-heading">Skills</h2>
              <div className="line"></div>
              {info.Skills &&
                info.Skills.map((item, index) => (
                  <div className="pg" key={index}>
                    <p>
                      <span>Programming Languages: </span>
                      <span>{item.programmingLanguages}</span>
                    </p>
                    <p>
                      <span>Frameworks and Libraries: </span>
                      <span>{item.frameworksAndLibraries}</span>
                    </p>
                    <p>
                      <span>Tools and Platforms: </span>
                      <span>{item.toolsAndPlatforms}</span>
                    </p>
                    <p>
                      <span>Soft Skills: </span>
                      <span>{item.softSkills}</span>
                    </p>
                  </div>
                ))}
            </div>
          </div>
        )}
        <Button
          onClick={generatePDF}
          variant="solid"
          size="md"
          rounded={"full"}
          background={"blue.500"}
          color={"white"}
          mx={7}
          my={3}
        >
          Generate PDF
        </Button>
      </div>
    </section>
  );
};

export default Create;
