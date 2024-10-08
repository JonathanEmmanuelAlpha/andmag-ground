import React, { useState } from "react";
import { faEnvelope, faGear } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";
import { useAuth } from "../../context/AuthProvider";
import SkeletonLayout from "../../components/skeleton-layout/SkeletonLayout";
import AccountContainer, {
  Input,
} from "../../components/skeleton-layout/AccountContainer";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, handleAuthErrors } from "../../firebase";

function Login(props) {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async function (event) {
    event.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const credential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      if (credential.user) {
        if (typeof router.query.next === "string") {
          return router.push(router.query.next);
        }
        return router.push("/account/profile");
      }
    } catch (error) {
      setError((prev) => {
        return handleAuthErrors(error);
      });
    }

    setLoading(false);
  };

  return (
    <SkeletonLayout
      title="Se connecter"
      description="Entrez votre email ainsi que le mot de passe associé pour vous connecter. Notez que si vous n'avez pas encore activé votre compte, vous ne pourrez pas pleinement l'utiliser."
    >
      <AccountContainer
        title="Bienvenue sur Andmag ground"
        message="Entrez votre email ainsi que le mot de passe associé pour vous connecter. Notez que si vous n'avez pas encore activé votre compte, vous ne pourrez pas pleinement l'utiliser."
        Form={
          <>
            <Input
              type="email"
              placeholder="Adresse email"
              value={email}
              isRequired
              handleChange={(e) => setEmail(e.target.value)}
              LeftIcon={<FontAwesomeIcon icon={faEnvelope} />}
            />
            <Input
              type="password"
              placeholder="Mot de passe"
              value={password}
              isRequired
              withFGP
              handleChange={(e) => setPassword(e.target.value)}
              LeftIcon={<FontAwesomeIcon icon={faGear} />}
            />
          </>
        }
        btnMsg="Connection"
        handleSubmit={handleSubmit}
        loading={loading}
        error={error}
        success={success}
        otherLinks={["register", "forgot-password", "with-email"]}
      />
    </SkeletonLayout>
  );
}

export default Login;
