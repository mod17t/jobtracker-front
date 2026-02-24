import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../../context/AuthContext";

const Login = () => {
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    t;
    e.preventDefault();

    setError("");

    setLoading(true);

    try {
      // Appelle la fonction login de AuthContext
      // Elle appelle /api/login et sauvegarde le token
      await login(email, password);

      // Si on arrive ici la connexion est réussie
      navigate("/");
    } catch {
      // Si on arrive ici = erreur (mauvais email/password)
      // On affiche un message d'erreur à l'utilisateur
      setError("Email ou mot de passe incorrect.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* PANNEAU GAUCHE SOMBRE */}

      <div className="hidden lg:flex w-1/2 bg-gray-900 flex-col justify-between p-12">
        <div className="text-xl font-bold text-white">🎯 JobTracker</div>

        <div>
          <h1 className="text-4xl font-bold text-white leading-tight mb-4">
            Pilotez votre
            <br />
            recherche d'emploi
            <br />
            <span className="text-orange-500">avec clarté.</span>
          </h1>

        </div>
      </div>

      {/* ── PANNEAU DROIT CLAIR ── */}
      <div className="flex-1 bg-stone-50 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Bon retour 👋
          </h2>

          <p className="text-gray-500 mb-8">
            Connectez-vous à votre espace JobTracker
          </p>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 rounded-xl p-4 mb-6 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Adresse email
              </label>

              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm outline-none focus:border-orange-500 bg-white transition-colors"
                placeholder="sarah@exemple.fr"
                required
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Mot de passe
              </label>

              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm outline-none focus:border-orange-500 bg-white transition-colors"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-xl transition-colors disabled:opacity-60"
            >
              {loading ? "Connexion..." : "Se connecter →"}
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-6">
            Pas encore de compte ?{" "}
            <Link
              to="/register"
              className="text-orange-500 font-semibold hover:underline"
            >
              Créer un compte
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
export default Login;