import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import spinner from "../../../Assets/spinner.gif";
<<<<<<< HEAD
import { themes } from "../../../lib/themes.js";
=======
import {themes} from '../../../lib/themes.js'
>>>>>>> 27c02272435c323488386150c779909c9f511c29

import {
  setTitleAndLanguage,
  setQuestionAndDescription,
  setCode,
  resetForm,
} from "../../../redux/action";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import axios from "axios";
import MonacoComponent from "../../../Components/monaco/index.monaco";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { CircleCheck } from "lucide-react";

// eslint-disable-next-line react/prop-types
const Add = ({ isActivity = false, group_id = null }) => {
  const [step, setStep] = useState(1);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formData = useSelector((state) => ({
    ...state.collectionReducer,
    user_id: state.userReducer.user ? state.userReducer.user.id : null,
  }));

  const handleNext = () => setStep((prev) => prev + 1);
  const handleBack = () => setStep((prev) => prev - 1);

  const handleSubmit = async () => {
    if (!formData.user_id) {
      toast.error("Utilisateur non authentifié. Veuillez vous connecter.");
      return;
    }

    try {
      const url = isActivity ? "/create-activity" : "/collections";
      const data = { typeActivity: "request", formData };
      const activityData = {
        data: data,
        group_id: group_id || null,
      };
      const response = await axios.post(
        `/api${url}`,
        isActivity ? activityData : formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.ok) {
        toast.success(response?.data?.message || "created successfully !");
        dispatch(resetForm());
        navigate(isActivity ? -1 : "/");
      } else {
        toast.error("Erreur lors de l'ajout.");
      }
    } catch (error) {
      toast.error("Erreur lors de l'ajout.");
      console.error(error);
    }
  };

  // };

  return (
    <div className="overflow-hidden mx-auto text-center  rounded-lg flex flex-col justify-center">
      <h2 className="text-sm w-full text-start m-2">Étape {step} sur 3</h2>

      {step === 1 && <Step1 onNext={handleNext} />}
      {step === 2 && <Step2 onNext={handleNext} onBack={handleBack} />}
      {step === 3 && (
        <Step3
          onBack={handleBack}
          onSubmit={handleSubmit}
          formData={formData}
        />
      )}
    </div>
  );
};

// eslint-disable-next-line react/prop-types
const Step1 = ({ onNext }) => {
  const dispatch = useDispatch();
  const { title, language } = useSelector((state) => state.collectionReducer);
  const languages = useSelector((state) => state.languagesReducer);

  const [error, setError] = useState("");
  const handleNext = () => {
    if (!title || !language) {
      setError("Veuillez remplir tous les champs.");
      return;
    }

    if (!/[A-Za-z]/.test(title) && /^[A-Za-z0-9\s]+$/.test(title)) {
      setError("Le titre ne peut pas contenir de chiffres.");
      return;
    }

    setError("");
    onNext();
  };
<<<<<<< HEAD
  const choosedTheme = useSelector((state) => state.themeReducer);
=======
  const choosedTheme = useSelector(
    (state) => state.themeReducer
  );
>>>>>>> 27c02272435c323488386150c779909c9f511c29
  return (
    <div className="w-full mx-auto mt-5 flex flex-col justify-center items-center">
      <div
        className="space-y-6"
        style={{
          color: themes.find((theme) => theme.name === choosedTheme).textColor,
        }}
      >
        <h1 className="text-2xl font-bold mb-2">New collection</h1>
        <p className=" mb-6">
          Create your own collections, share your code, solution, feedback,
          rates, and your suggestions
        </p>

        <div className="w-full mx-auto mb-4 flex justify-evenly items-end ">
<<<<<<< HEAD
          <label className="block  mb-2 w-1/3 ">Name of your collection:</label>
=======
          <label className="block  mb-2 w-1/3 ">
            Name of your collection:
          </label>
>>>>>>> 27c02272435c323488386150c779909c9f511c29
          <input
            placeholder="Enter your collection name"
            type="text"
            value={title}
            onChange={(e) =>
              dispatch(setTitleAndLanguage(e.target.value, language))
            }
            className="w-2/3 p-2  border border-gray-600 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-white"
<<<<<<< HEAD
            style={{
              backgroundColor: themes.find(
                (theme) => theme.name === choosedTheme
              ).colors[1],
              color: themes.find((theme) => theme.name === choosedTheme)
                .textColor,
            }}
=======
            style={{ backgroundColor: themes.find((theme) => theme.name === choosedTheme).colors[1] ,color:themes.find((theme) => theme.name === choosedTheme).textColor }}
>>>>>>> 27c02272435c323488386150c779909c9f511c29
          />
        </div>
      </div>
      <div className="w-2/3 mx-auto mb-4">
        <div>
          <label className="block mb-2">Select language :</label>
          <div className="grid grid-cols-3 gap-2">
<<<<<<< HEAD
            {languages.map((lang) => (
              <button
                key={lang?.name}
                onClick={() =>
                  dispatch(setTitleAndLanguage(title, lang?.name.toLowerCase()))
                }
                className="cursor-pointer p-2 rounded-md text-sm transition-colors duration-200 relative"
                style={{
                  backgroundColor:
                    language === lang?.name.toLowerCase()
                      ? themes.find((theme) => theme.name === choosedTheme)
                          ?.colors[0]
                      : themes.find((theme) => theme.name === choosedTheme)
                          ?.colors[2],
                  color: themes.find((theme) => theme.name === choosedTheme)
                    ?.textColor,
                  border: `1px solid ${
                    language === lang?.name.toLowerCase()
                      ? themes.find((theme) => theme.name === choosedTheme)
                          ?.colors[2]
                      : themes.find((theme) => theme.name === choosedTheme)
                          ?.colors[0]
                  }`,
                }}
                onMouseEnter={(e) => {
                  if (language !== lang?.name.toLowerCase()) {
                    e.currentTarget.style.backgroundColor = themes.find(
                      (theme) => theme.name === choosedTheme
                    )?.colors[1];
                    e.currentTarget.style.border = `1px solid ${
                      themes.find((theme) => theme.name === choosedTheme)
                        ?.colors[2]
                    }`;
                  }
                }}
                onMouseLeave={(e) => {
                  if (language !== lang?.name.toLowerCase()) {
                    e.currentTarget.style.backgroundColor = themes.find(
                      (theme) => theme.name === choosedTheme
                    )?.colors[2];
                  }
                }}
              >
                #{lang?.name}
                {language === lang?.name.toLowerCase() && (
                  <CircleCheck
                    className="absolute fill-blue-500  -top-2 -right-2"
                    style={{
                      color: themes.find((theme) => theme.name === choosedTheme)
                        ?.colors[2],
                    }}
                  />
                )}
              </button>
=======
            {[
              "Javascript",
              "html",
              "algorithm",
              "css",
              "laravel",
              "react",
              "php",
              "python",
              "Bootstrap",
            ].map((lang) => (
<button
  key={lang}
  onClick={() =>
    dispatch(setTitleAndLanguage(title, lang.toLowerCase()))
  }
  className="cursor-pointer p-2 rounded-md text-sm transition-colors duration-200"
  style={{
    backgroundColor:
      language === lang.toLowerCase()
        ? themes.find((theme) => theme.name === choosedTheme)?.colors[0]
        : themes.find((theme) => theme.name === choosedTheme)?.colors[2],
    color:themes.find((theme) => theme.name === choosedTheme)?.textColor,
    border: `1px solid ${
      language === lang.toLowerCase()
        ? themes.find((theme) => theme.name === choosedTheme)?.colors[2]
        : themes.find((theme) => theme.name === choosedTheme)?.colors[0]
    }`,
  }}
  onMouseEnter={(e) => {
    if (language !== lang.toLowerCase()) {
      e.currentTarget.style.backgroundColor =
        themes.find((theme) => theme.name === choosedTheme)?.colors[1];
        e.currentTarget.style.border = `1px solid ${themes.find((theme) => theme.name === choosedTheme)?.colors[2]}`;
    }
  }}
  onMouseLeave={(e) => {
    if (language !== lang.toLowerCase()) {
      e.currentTarget.style.backgroundColor =
        themes.find((theme) => theme.name === choosedTheme)?.colors[2];
    }
  }}
>
  #{lang}
</button>

>>>>>>> 27c02272435c323488386150c779909c9f511c29
            ))}
          </div>
        </div>
      </div>
      {error && <p className="text-red-500">{error}</p>}

      <button
        onClick={handleNext}
        className="w-1/5 mt-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition-colors text-sm cursor-pointer"
      >
        Let's get started
      </button>
    </div>
  );
};

// eslint-disable-next-line react/prop-types
const Step2 = ({ onNext, onBack }) => {
  const dispatch = useDispatch();
  const { question, description } = useSelector(
    (state) => state.collectionReducer
  );
  const handleNext = () => {
    if (!question || !description) {
      toast.warning("Veuillez remplir tous les champs.");
      return;
    }
    onNext();
  };
<<<<<<< HEAD
  const choosedTheme = useSelector((state) => state.themeReducer);
=======
  const choosedTheme = useSelector(
    (state) => state.themeReducer
  );
>>>>>>> 27c02272435c323488386150c779909c9f511c29
  return (
    <div
      className="space-y-6 w-full mx-auto mt-5"
      style={{
        color: themes.find((theme) => theme.name === choosedTheme).textColor,
      }}
    >
      <div className="space-y-6 w-1/2 mx-auto mb-4">
        <h3 className="text-xl font-semibold">
          Ajoutez la question et la description
        </h3>
        <input
          type="text"
          placeholder="Here enter your question .."
          value={question}
          onChange={(e) =>
            dispatch(setQuestionAndDescription(e.target.value, description))
          }
          className="w-full p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white appearance-none"
<<<<<<< HEAD
          style={{
            backgroundColor: themes.find((theme) => theme.name === choosedTheme)
              .colors[1],
            color: themes.find((theme) => theme.name === choosedTheme)
              .textColor,
            border: `1px solid ${
              themes.find((theme) => theme.name === choosedTheme)?.colors[2]
            }`,
          }}
=======
                    style={{ backgroundColor: themes.find((theme) => theme.name === choosedTheme).colors[1] ,color:themes.find((theme) => theme.name === choosedTheme).textColor }}
>>>>>>> 27c02272435c323488386150c779909c9f511c29
        />
        <textarea
          rows="8"
          placeholder="Here enter your description .."
          value={description}
          onChange={(e) =>
            dispatch(setQuestionAndDescription(question, e.target.value))
          }
          className="w-full p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white appearance-none"
<<<<<<< HEAD
          style={{
            backgroundColor: themes.find((theme) => theme.name === choosedTheme)
              .colors[1],
            color: themes.find((theme) => theme.name === choosedTheme)
              .textColor,
            border: `1px solid ${
              themes.find((theme) => theme.name === choosedTheme)?.colors[2]
            }`,
          }}
=======
                    style={{ backgroundColor: themes.find((theme) => theme.name === choosedTheme).colors[1] ,color:themes.find((theme) => theme.name === choosedTheme).textColor }}
>>>>>>> 27c02272435c323488386150c779909c9f511c29
        />
      </div>
      <div className="flex justify-center space-x-2 mt-4 text-sm">
        <button
          onClick={onBack}
          className="space-x-2 px-6 cursor-pointer py-2  font-semibold rounded-lg shadow-md transition duration-300"
        >
          <FontAwesomeIcon icon={faChevronLeft} />
          <span>Retour</span>
        </button>
        <button
          onClick={handleNext}
          className="space-x-2 px-6 py-2 cursor-pointer bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition duration-300"
        >
          <span>Suivant</span>
          <FontAwesomeIcon icon={faChevronRight} />
        </button>
      </div>
    </div>
  );
};

// eslint-disable-next-line react/prop-types
const Step3 = ({ onBack, formData }) => {
  const dataFinal = useSelector((state) => state.collectionReducer);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.userReducer.token);

  const [loading, setLoading] = useState(false);
  const handleSubmit = async () => {
    setLoading(true);
    if (!dataFinal.code) {
      toast.warning("Veuillez entrer du code.");
      setLoading(false);
      return;
    }

    try {
      const res = await axios.post("/api/collections", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (
        res.status !== 200 &&
        res.status !== 201 &&
        res.status !== 204 &&
        res.status !== 202
      ) {
        toast.error("Erreur lors de l'ajout.");
        setLoading(false);
        return;
      }
      toast.success("Collection ajoutée avec succès !");
    } catch (error) {
      console.error(error);
      toast.error("Erreur lors de l'ajout.");
    } finally {
      setTimeout(() => {
        setLoading(false);
        dispatch(resetForm());
        navigate("/");
      }, 2000);
    }
  };

  return (
    <div className="space-y-2 mx-auto overflow-hidden">
      <MonacoComponent />

      <div className="flex w-full justify-end space-x-2 mt-4 text-sm">
        <button
          onClick={onBack}
          className="space-x-2 px-6 cursor-pointer py-2 bg-gray-600 hover:bg-gray-700 text-white font-semibold rounded-lg shadow-md transition duration-300"
        >
          <FontAwesomeIcon icon={faChevronLeft} />
          <span>return</span>
        </button>
        <button
          onClick={handleSubmit}
          className="cursor-pointer space-x-2 px-6 py-2 bg-blue-500 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition duration-300"
        >
          {loading ? (
            <img src={spinner} alt="Loading..." className="w-5 h-5 mx-auto" />
          ) : (
            <div className="flex space-x-2 items-center">
              <FontAwesomeIcon icon={faCheck} />
              <span>submit</span>
            </div>
          )}
        </button>
      </div>
    </div>
  );
};

export default Add;
