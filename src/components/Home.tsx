import { Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import "../css/Home.css";
import { Github, Star } from "lucide-react";

const Home = () => {
  return (
    <main>
      <div className="bg-pattern">
        <div className="bg-radial-gradient"></div>
      </div>

      <h1>DevFolio.</h1>
      <p>
        This is a simple CV builder made for devs to quickly build their CV with
        ease and speed.
      </p>
      <div className="buttons">
        <Button
          as={Link}
          to="/create"
          variant="outline"
          size="md"
          rounded={"full"}
          background={"white"}
        >
          Create CV
        </Button>
        <a href="https://github.com/adamst27/cv-builder">
          <Button
            variant="outline"
            background={"white"}
            size="md"
            rounded={"full"}
            rightIcon={<Github />}
            gap={1}
          >
            Give it a <Star color="#f59e0b" fill="#f59e0b" size={16} /> on
          </Button>
        </a>
      </div>
    </main>
  );
};

export default Home;
