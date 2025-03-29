import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setTitleAndLanguage, setQuestionAndDescription, setCode, resetForm } from "../../../redux/action";
import { useNavigate } from "react-router-dom";
import { toast } from 'sonner';
import axios from "axios";

const Add = () => {
    const [step, setStep] = useState(1);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const formData = useSelector((state) => ({
        ...state.collectionReducer,
        id_user: state.userReducer.user ? state.userReducer.user.id : null, 
    }));

    const handleNext = () => setStep((prev) => prev + 1);
    const handleBack = () => setStep((prev) => prev - 1);

    const handleSubmit = async () => {
        if (!formData.id_user) {
            toast.error("Utilisateur non authentifié. Veuillez vous connecter.");
            return;
        }

        try {
            const response = await axios.post("/api/collections", formData);
            toast.success("Collection ajoutée avec succès !");
            dispatch(resetForm());
            navigate("/");
        } catch (error) {
            toast.error("Erreur lors de l'ajout.");
            console.error(error);
        }
    };

    return (
        <div className="max-w-lg mx-auto text-center p-6 bg-[#21252B] text-white rounded-lg">
            <h2 className="text-2xl mb-6">Étape {step} sur 3</h2>

            {step === 1 && <Step1 onNext={handleNext} />}
            {step === 2 && <Step2 onNext={handleNext} onBack={handleBack} />}
            {step === 3 && <Step3 onBack={handleBack} onSubmit={handleSubmit} formData={formData} />}
        </div>
    );
};

const Step1 = ({ onNext }) => {
    const dispatch = useDispatch();
    const { title, language } = useSelector((state) => state.collectionReducer);
    const [error, setError] = useState(""); 

    const handleNext = () => {
        if (!title || !language) {
            setError("Veuillez remplir tous les champs.");
            return;
        }

        if (!/[A-Za-z]/.test(title) && /^[A-Za-z0-9\s]+$/.test(title)){

            setError("Le titre ne peut pas contenir de chiffres.");
            return;
        }

        setError(""); 
        onNext();
    };

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold mb-2">New collection</h1>
            <p className="text-gray-300 mb-6">
                Create your own collections, share your code, solution, feedback, rates, and your suggestions
            </p>

            <div>
                <label className="block text-gray-300 mb-2">Name of your collection:</label>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => dispatch(setTitleAndLanguage(e.target.value, language))}
                    className="w-full p-3 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-white"
                />
            </div>

            <div>
                <label className="block text-gray-300 mb-2">Select language:</label>
                <div className="grid grid-cols-3 gap-2">
                    {["Javascript", "html", "algorithm", "css", "laravel", "react", "php", "python", "Bootstrap"].map((lang) => (
                        <button
                            key={lang}
                            onClick={() => dispatch(setTitleAndLanguage(title, lang.toLowerCase()))}
                            className={`p-2 rounded-md text-sm ${language === lang.toLowerCase() ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}
                        >
                            #{lang}
                        </button>
                    ))}
                </div>
            </div>

            {error && <p className="text-red-500">{error}</p>} 

            <button 
                onClick={handleNext}
                className="w-full mt-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition-colors"
            >
                Let's get started
            </button>
        </div>
    );
};

const Step2 = ({ onNext, onBack }) => {
    const dispatch = useDispatch();
    const { question, description } = useSelector((state) => state.collectionReducer);
    const [error, setError] = useState(""); 

    const handleNext = () => {
        if (!question || !description) {
            setError("Veuillez remplir tous les champs.");
            return;
        }
        if (!/[A-Za-z]/.test(question) && /^[A-Za-z0-9\s]+$/.test(question)) {
            setError("La question ne peut pas contenir de chiffres.");
            return;
        }
        if (!/[A-Za-z]/.test(description) && /^[A-Za-z0-9\s]+$/.test(description)) {
            setError("La description ne peut pas contenir de chiffres.");
            return;
        }

        setError("");
        onNext();
    };

    return (
        <div className="space-y-4">
            <h3 className="text-xl font-semibold">Ajoutez la question et la description</h3>
            <input 
                type="text" 
                placeholder="Question" 
                value={question} 
                onChange={(e) => dispatch(setQuestionAndDescription(e.target.value, description))}
                className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white appearance-none"
            />
            <textarea 
                rows={15}
                placeholder="Description" 
                value={description} 
                onChange={(e) => dispatch(setQuestionAndDescription(question, e.target.value))}
                className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white appearance-none"
            />
            {error && <p className="text-red-500">{error}</p>}

            <div className="flex justify-between mt-4">
                <button onClick={onBack} className="px-6 py-2 bg-gray-600 hover:bg-gray-700 text-white font-semibold rounded-lg shadow-md transition duration-300">Retour</button>
                <button onClick={handleNext} className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition duration-300">Suivant</button>
            </div>
        </div>
    );
};


const Step3 = ({ onBack, onSubmit }) => {
    const dispatch = useDispatch();
    const { code } = useSelector((state) => state.collectionReducer);
    const [error, setError] = useState("");

    const handleSubmit = async () => {
        if (!code) {
            setError("Veuillez entrer du code.");
            return;
        }

        setError("");
        onSubmit();
    };

    return (
        <div className="space-y-4">
            <h3 className="text-xl font-semibold">Ajoutez le code</h3>
            <textarea 
            placeholder="//code"
                rows={15}
                value={code} 
                onChange={(e) => dispatch(setCode(e.target.value))}
                className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white appearance-none"
            />

            {error && <p className="text-red-500">{error}</p>}

            <div className="flex justify-between mt-4">
                <button onClick={onBack} className="px-6 py-2 bg-gray-600 hover:bg-gray-700 text-white font-semibold rounded-lg shadow-md transition duration-300">Retour</button>
                <button onClick={handleSubmit} className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg shadow-md transition duration-300">Soumettre</button>
            </div>
        </div>
    );
};


export default Add;
