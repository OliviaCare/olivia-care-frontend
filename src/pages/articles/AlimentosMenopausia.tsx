import React from 'react';
import { Apple, Leaf, ThermometerSun, Moon, Brain, Heart, Droplets } from 'lucide-react';

const AlimentosMenopausia = () => {
  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold text-purple-800 mb-4">
        10 Alimentos para Reducir los Síntomas de la Menopausia de Forma Natural
      </h1>
      <p className="text-gray-600 mb-6">
        Descubre cómo ciertos alimentos pueden ayudarte a aliviar los síntomas de la menopausia y mejorar tu bienestar general durante esta etapa.
      </p>

      <section className="mb-8">
        <div className="bg-gradient-to-r from-green-100 to-blue-100 p-6 rounded-lg mb-8">
          <p className="text-gray-700 italic">
            "La alimentación juega un papel fundamental en cómo experimentamos la menopausia. Incorporar ciertos alimentos a nuestra dieta puede ayudarnos a reducir los síntomas y mejorar nuestra calidad de vida durante esta etapa."
          </p>
        </div>

        <h2 className="text-2xl font-semibold text-purple-700 mb-6">
          ¿Por qué la alimentación es importante durante la menopausia?
        </h2>

        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <p className="text-gray-700 mb-4">
            Durante la menopausia, los niveles de estrógeno disminuyen, lo que puede provocar diversos síntomas como sofocos, cambios de humor, problemas de sueño y pérdida de densidad ósea. Ciertos alimentos contienen nutrientes y compuestos que pueden ayudar a aliviar estos síntomas y proteger tu salud a largo plazo.
          </p>
          
          <p className="text-gray-700">
            Los alimentos ricos en fitoestrógenos (compuestos vegetales similares al estrógeno), calcio, vitamina D, ácidos grasos omega-3 y antioxidantes son especialmente beneficiosos durante esta etapa. Además, mantener una alimentación equilibrada puede ayudar a controlar el peso, que tiende a aumentar durante la menopausia.
          </p>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-purple-700 mb-6">
          10 Alimentos Recomendados para la Menopausia
        </h2>

        <div className="space-y-6">
          {/* Soja y derivados */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-start">
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mr-4 flex-shrink-0">
                <Leaf className="text-green-600" size={24} />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-green-700 mb-2">1. Soja y sus derivados</h3>
                <p className="text-gray-700 mb-3">
                  La soja es rica en isoflavonas, un tipo de fitoestrógeno que puede ayudar a reducir los sofocos y otros síntomas de la menopausia. Puedes consumirla en forma de tofu, tempeh, edamame o bebida de soja.
                </p>
                <div className="bg-green-50 p-3 rounded-lg">
                  <h4 className="font-medium text-green-700 mb-1">Beneficios:</h4>
                  <ul className="list-disc pl-5 text-gray-700">
                    <li>Reduce la frecuencia e intensidad de los sofocos</li>
                    <li>Puede mejorar la salud ósea</li>
                    <li>Ayuda a mantener el equilibrio hormonal</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Semillas de lino */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-start">
              <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center mr-4 flex-shrink-0">
                <Leaf className="text-amber-600" size={24} />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-amber-700 mb-2">2. Semillas de lino</h3>
                <p className="text-gray-700 mb-3">
                  Las semillas de lino son una excelente fuente de lignanos, otro tipo de fitoestrógeno. También son ricas en ácidos grasos omega-3, que tienen propiedades antiinflamatorias y pueden ayudar a reducir los sofocos.
                </p>
                <div className="bg-amber-50 p-3 rounded-lg">
                  <h4 className="font-medium text-amber-700 mb-1">Cómo consumirlas:</h4>
                  <p className="text-gray-700">
                    Añade semillas de lino molidas a tu yogur, batidos, ensaladas o cereales. Es importante molerlas para que el cuerpo pueda absorber sus nutrientes.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Frutas y verduras ricas en calcio */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-start">
              <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mr-4 flex-shrink-0">
                <Apple className="text-red-600" size={24} />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-red-700 mb-2">3. Frutas y verduras ricas en calcio</h3>
                <p className="text-gray-700 mb-3">
                  El calcio es esencial para mantener la salud ósea, especialmente durante la menopausia cuando el riesgo de osteoporosis aumenta. Algunas verduras de hoja verde como el kale, la col rizada y el brócoli son buenas fuentes de calcio, al igual que las naranjas y los higos.
                </p>
                <div className="bg-red-50 p-3 rounded-lg">
                  <h4 className="font-medium text-red-700 mb-1">Opciones recomendadas:</h4>
                  <ul className="list-disc pl-5 text-gray-700">
                    <li>Kale y col rizada</li>
                    <li>Brócoli</li>
                    <li>Naranjas</li>
                    <li>Higos</li>
                    <li>Almendras</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Pescados grasos */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-start">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mr-4 flex-shrink-0">
                <Heart className="text-blue-600" size={24} />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-blue-700 mb-2">4. Pescados grasos</h3>
                <p className="text-gray-700 mb-3">
                  Los pescados grasos como el salmón, las sardinas y el atún son ricos en ácidos grasos omega-3 y vitamina D, ambos importantes para la salud ósea y cardiovascular. Los ácidos grasos omega-3 también pueden ayudar a reducir la inflamación y mejorar el estado de ánimo.
                </p>
                <div className="bg-blue-50 p-3 rounded-lg">
                  <h4 className="font-medium text-blue-700 mb-1">Beneficios:</h4>
                  <ul className="list-disc pl-5 text-gray-700">
                    <li>Mejora la salud cardiovascular</li>
                    <li>Reduce la inflamación</li>
                    <li>Puede aliviar los síntomas depresivos</li>
                    <li>Aporta vitamina D para la salud ósea</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Yogur y otros lácteos */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-start">
              <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center mr-4 flex-shrink-0">
                <Heart className="text-indigo-600" size={24} />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-indigo-700 mb-2">5. Yogur y otros lácteos</h3>
                <p className="text-gray-700 mb-3">
                  Los productos lácteos son ricos en calcio, vitamina D y proteínas, todos nutrientes esenciales para mantener la salud ósea. El yogur, además, contiene probióticos que benefician la salud digestiva e inmunológica.
                </p>
                <div className="bg-indigo-50 p-3 rounded-lg">
                  <h4 className="font-medium text-indigo-700 mb-1">Recomendación:</h4>
                  <p className="text-gray-700">
                    Opta por versiones bajas en grasa y sin azúcares añadidos. Si eres intolerante a la lactosa o prefieres alternativas vegetales, busca opciones fortificadas con calcio y vitamina D.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Frutos secos y semillas */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-start">
              <div className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center mr-4 flex-shrink-0">
                <Apple className="text-yellow-600" size={24} />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-yellow-700 mb-2">6. Frutos secos y semillas</h3>
                <p className="text-gray-700 mb-3">
                  Las nueces, almendras, semillas de chía y semillas de girasol son ricas en ácidos grasos saludables, proteínas, fibra y diversos micronutrientes. Pueden ayudar a controlar el peso, reducir el colesterol y mejorar la salud cardiovascular.
                </p>
                <div className="bg-yellow-50 p-3 rounded-lg">
                  <h4 className="font-medium text-yellow-700 mb-1">Cómo incluirlos:</h4>
                  <p className="text-gray-700">
                    Añade un puñado de frutos secos a tu desayuno o como snack a media mañana. Las semillas pueden incorporarse a ensaladas, yogures o batidos.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Granos integrales */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-start">
              <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center mr-4 flex-shrink-0">
                <Leaf className="text-amber-600" size={24} />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-amber-700 mb-2">7. Granos integrales</h3>
                <p className="text-gray-700 mb-3">
                  Los granos integrales como la avena, el arroz integral, la quinoa y el trigo integral son ricos en fibra, vitaminas del grupo B y minerales. La fibra ayuda a mantener estables los niveles de azúcar en sangre y promueve la sensación de saciedad, lo que puede ayudar a controlar el peso.
                </p>
                <div className="bg-amber-50 p-3 rounded-lg">
                  <h4 className="font-medium text-amber-700 mb-1">Beneficios:</h4>
                  <ul className="list-disc pl-5 text-gray-700">
                    <li>Ayudan a controlar el peso</li>
                    <li>Estabilizan los niveles de azúcar en sangre</li>
                    <li>Promueven la salud digestiva</li>
                    <li>Aportan energía sostenida</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Frutas y verduras ricas en antioxidantes */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-start">
              <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center mr-4 flex-shrink-0">
                <Apple className="text-purple-600" size={24} />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-purple-700 mb-2">8. Frutas y verduras ricas en antioxidantes</h3>
                <p className="text-gray-700 mb-3">
                  Los alimentos ricos en antioxidantes como los arándanos, las fresas, las espinacas y los pimientos ayudan a combatir el estrés oxidativo y la inflamación, que pueden aumentar durante la menopausia. También contribuyen a mantener la salud cardiovascular y cerebral.
                </p>
                <div className="bg-purple-50 p-3 rounded-lg">
                  <h4 className="font-medium text-purple-700 mb-1">Opciones recomendadas:</h4>
                  <ul className="list-disc pl-5 text-gray-700">
                    <li>Bayas (arándanos, fresas, frambuesas)</li>
                    <li>Verduras de hoja verde oscuro</li>
                    <li>Pimientos de colores</li>
                    <li>Tomates</li>
                    <li>Zanahorias</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Agua y té verde */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-start">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mr-4 flex-shrink-0">
                <Droplets className="text-blue-600" size={24} />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-blue-700 mb-2">9. Agua y té verde</h3>
                <p className="text-gray-700 mb-3">
                  Mantenerse bien hidratada es esencial durante la menopausia, ya que puede ayudar a aliviar la sequedad y reducir la retención de líquidos. El té verde, además de hidratar, contiene antioxidantes que pueden ayudar a proteger contra enfermedades cardíacas y ciertos tipos de cáncer.
                </p>
                <div className="bg-blue-50 p-3 rounded-lg">
                  <h4 className="font-medium text-blue-700 mb-1">Beneficios del té verde:</h4>
                  <ul className="list-disc pl-5 text-gray-700">
                    <li>Rico en antioxidantes</li>
                    <li>Puede ayudar a aumentar el metabolismo</li>
                    <li>Propiedades antiinflamatorias</li>
                    <li>Puede reducir el riesgo de enfermedades cardíacas</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Alimentos fermentados */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-start">
              <div className="w-12 h-12 rounded-full bg-pink-100 flex items-center justify-center mr-4 flex-shrink-0">
                <Heart className="text-pink-600" size={24} />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-pink-700 mb-2">10. Alimentos fermentados</h3>
                <p className="text-gray-700 mb-3">
                  Los alimentos fermentados como el yogur, el kéfir, el chucrut y el kimchi contienen probióticos que promueven la salud intestinal. Un intestino sano es fundamental para la absorción de nutrientes y puede influir positivamente en el estado de ánimo y el sistema inmunológico.
                </p>
                <div className="bg-pink-50 p-3 rounded-lg">
                  <h4 className="font-medium text-pink-700 mb-1">Opciones para incluir en tu dieta:</h4>
                  <ul className="list-disc pl-5 text-gray-700">
                    <li>Yogur natural con cultivos vivos</li>
                    <li>Kéfir</li>
                    <li>Chucrut</li>
                    <li>Kimchi</li>
                    <li>Tempeh</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-purple-700 mb-4">
          Alimentos a Limitar Durante la Menopausia
        </h2>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <p className="text-gray-700 mb-4">
            Así como hay alimentos que pueden ayudar a aliviar los síntomas de la menopausia, hay otros que pueden empeorarlos:
          </p>
          <ul className="space-y-3">
            <li className="flex items-start">
              <ThermometerSun className="text-red-500 mr-3 mt-1 flex-shrink-0" size={20} />
              <div>
                <strong className="text-gray-800">Alimentos picantes:</strong>
                <p className="text-gray-700">Pueden desencadenar o empeorar los sofocos en algunas mujeres.</p>
              </div>
            </li>
            <li className="flex items-start">
              <Brain className="text-red-500 mr-3 mt-1 flex-shrink-0" size={20} />
              <div>
                <strong className="text-gray-800">Cafeína y alcohol:</strong>
                <p className="text-gray-700">Pueden alterar el sueño, empeorar los sofocos y contribuir a la deshidratación.</p>
              </div>
            </li>
            <li className="flex items-start">
              <Moon className="text-red-500 mr-3 mt-1 flex-shrink-0" size={20} />
              <div>
                <strong className="text-gray-800">Alimentos procesados y azúcares refinados:</strong>
                <p className="text-gray-700">Pueden causar fluctuaciones en los niveles de azúcar en sangre, afectando el estado de ánimo y la energía.</p>
              </div>
            </li>
            <li className="flex items-start">
              <Heart className="text-red-500 mr-3 mt-1 flex-shrink-0" size={20} />
              <div>
                <strong className="text-gray-800">Grasas saturadas y trans:</strong>
                <p className="text-gray-700">Pueden aumentar el riesgo de enfermedades cardíacas, que ya es mayor después de la menopausia.</p>
              </div>
            </li>
          </ul>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-purple-700 mb-4">
          Consejos Prácticos
        </h2>
        <div className="bg-purple-50 p-6 rounded-lg">
          <ul className="space-y-4">
            <li className="flex items-start">
              <div className="w-6 h-6 rounded-full bg-purple-200 text-purple-700 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                1
              </div>
              <p className="text-gray-700">
                <strong>Planifica tus comidas:</strong> Intenta incluir al menos uno de estos alimentos beneficiosos en cada comida.
              </p>
            </li>
            <li className="flex items-start">
              <div className="w-6 h-6 rounded-full bg-purple-200 text-purple-700 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                2
              </div>
              <p className="text-gray-700">
                <strong>Mantén un diario alimentario:</strong> Anota lo que comes y cómo te sientes después para identificar qué alimentos mejoran o empeoran tus síntomas.
              </p>
            </li>
            <li className="flex items-start">
              <div className="w-6 h-6 rounded-full bg-purple-200 text-purple-700 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                3
              </div>
              <p className="text-gray-700">
                <strong>Hidratación constante:</strong> Bebe al menos 8 vasos de agua al día para mantener la hidratación y ayudar a reducir los sofocos.
              </p>
            </li>
            <li className="flex items-start">
              <div className="w-6 h-6 rounded-full bg-purple-200 text-purple-700 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                4
              </div>
              <p className="text-gray-700">
                <strong>Comidas pequeñas y frecuentes:</strong> Pueden ayudar a mantener estables los niveles de azúcar en sangre y la energía a lo largo del día.
              </p>
            </li>
            <li className="flex items-start">
              <div className="w-6 h-6 rounded-full bg-purple-200 text-purple-700 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                5
              </div>
              <p className="text-gray-700">
                <strong>Consulta con profesionales:</strong> Antes de hacer cambios significativos en tu dieta o comenzar con suplementos, consulta con un profesional de la salud o un nutricionista.
              </p>
            </li>
          </ul>
        </div>
      </section>

      <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
        <p className="text-gray-700 mb-4">
          Recuerda que cada mujer experimenta la menopausia de manera diferente, y lo que funciona para una puede no funcionar para otra. Estos alimentos pueden ayudar a aliviar los síntomas, pero no sustituyen un tratamiento médico adecuado si es necesario.
        </p>
        <p className="text-gray-700">
          Para más información y consejos personalizados, no dudes en consultar con nuestros profesionales de la salud especializados en menopausia.
        </p>
        <div className="mt-6">
          <a
            href="https://maiacare.es/10-alimentos-para-reducir-los-sintomas-de-la-menopausia-de-forma-natural/"
            className="bg-purple-600 text-white py-3 px-6 rounded-lg hover:bg-purple-700 transition-colors inline-flex items-center"
            target="_blank"
            rel="noopener noreferrer"
          >
            <ExternalLink size={18} className="mr-2" />
            Ver artículo original
          </a>
        </div>
      </div>
    </div>
  );
};

// Componente ExternalLink para el ícono
const ExternalLink = ({ size, className }: { size: number, className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
    <polyline points="15 3 21 3 21 9"></polyline>
    <line x1="10" y1="14" x2="21" y2="3"></line>
  </svg>
);

export default AlimentosMenopausia;