import React from 'react';
import { Pill, Shield, Heart, AlertCircle, Clock, HelpCircle } from 'lucide-react';

const TerapiaHormonalSustitutiva = () => {
  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold text-purple-800 mb-4">
        Terapia Hormonal Sustitutiva (THS): La Hoja Informativa Básica
      </h1>
      <p className="text-gray-600 mb-6">
        La forma más efectiva de tratar los síntomas de la perimenopausia y la menopausia es reemplazar las hormonas que tu cuerpo ya no produce. La THS también ofrece beneficios para la salud a largo plazo.
      </p>

      <section className="mb-8">
        <div className="bg-gradient-to-r from-blue-100 to-purple-100 p-6 rounded-lg mb-8">
          <p className="text-gray-700 italic">
            "La THS no solo alivia los síntomas de la menopausia, sino que también puede reducir el riesgo futuro de desarrollar enfermedades cardíacas, osteoporosis, diabetes, depresión y demencia."
          </p>
        </div>

        <h2 className="text-2xl font-semibold text-purple-700 mb-6">
          ¿Qué es la THS?
        </h2>

        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <p className="text-gray-700 mb-4">
            La THS es un tratamiento hormonal que incluye las hormonas estrógeno, a menudo progestágeno y en algunos casos testosterona.
          </p>
          
          <div className="space-y-6">
            <div className="flex items-start">
              <div className="w-12 h-12 rounded-full bg-pink-100 flex items-center justify-center mr-4 flex-shrink-0">
                <Pill className="text-pink-600" size={24} />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-pink-700 mb-2">Estrógeno</h3>
                <p className="text-gray-700">
                  Este estrógeno de reemplazo se puede administrar de varias maneras: como un parche para la piel, como un gel o un aerosol, o como una pastilla. El tipo de estrógeno más utilizado es el 17 beta-estradiol, que tiene la misma estructura molecular que el estrógeno producido naturalmente en el cuerpo. Se deriva del vegetal de raíz de ñame.
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center mr-4 flex-shrink-0">
                <Pill className="text-purple-600" size={24} />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-purple-700 mb-2">Progestágeno</h3>
                <p className="text-gray-700">
                  Si todavía tienes útero (matriz), deberás tomar un progestágeno junto con el estrógeno, lo que se conoce como THS combinada. Tomar estrógeno por sí solo puede engrosar el revestimiento del útero y aumentar el riesgo de cáncer uterino; tomar un progestágeno mantiene el revestimiento delgado y revierte este riesgo. El tipo más seguro de progestágeno de reemplazo se llama progesterona micronizada. Una forma alternativa de recibir un progestágeno es insertar el dispositivo intrauterino Mirena en el útero, que también es un anticonceptivo muy efectivo.
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mr-4 flex-shrink-0">
                <Pill className="text-blue-600" size={24} />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-blue-700 mb-2">Testosterona</h3>
                <p className="text-gray-700">
                  Para las mujeres que todavía experimentan síntomas como fatiga, niebla mental y falta de libido después de tomar estrógeno durante unos meses, la testosterona puede ser beneficiosa (además del estrógeno) para lograr mejoras adicionales de estos síntomas particulares. Está disponible en un gel o una crema y, aunque actualmente no está autorizado como tratamiento para mujeres en todos los países, es utilizado de manera amplia y segura por médicos especialistas en menopausia.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-purple-700 mb-4">
          Beneficios de la THS
        </h2>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <ul className="space-y-4">
            <li className="flex items-start">
              <Shield className="text-green-600 mr-3 mt-1 flex-shrink-0" size={20} />
              <div>
                <strong className="text-gray-800">Mejora de síntomas:</strong>
                <p className="text-gray-700">La mayoría de las mujeres siente un retorno de su "viejo yo" dentro de los 3-6 meses posteriores al inicio de la THS.</p>
              </div>
            </li>
            <li className="flex items-start">
              <Shield className="text-green-600 mr-3 mt-1 flex-shrink-0" size={20} />
              <div>
                <strong className="text-gray-800">Protección ósea:</strong>
                <p className="text-gray-700">Reducción del riesgo de desarrollar osteoporosis, protegiendo tus huesos contra el debilitamiento debido a la falta de estrógeno.</p>
              </div>
            </li>
            <li className="flex items-start">
              <Heart className="text-green-600 mr-3 mt-1 flex-shrink-0" size={20} />
              <div>
                <strong className="text-gray-800">Salud cardiovascular:</strong>
                <p className="text-gray-700">Menor riesgo de desarrollar problemas cardíacos, accidente cerebrovascular o demencia vascular.</p>
              </div>
            </li>
            <li className="flex items-start">
              <Shield className="text-green-600 mr-3 mt-1 flex-shrink-0" size={20} />
              <div>
                <strong className="text-gray-800">Otros beneficios para la salud:</strong>
                <p className="text-gray-700">Las mujeres que toman THS también tienen un menor riesgo futuro de diabetes tipo 2, osteoartritis, cáncer de intestino y depresión.</p>
              </div>
            </li>
          </ul>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-purple-700 mb-4">
          Riesgos y Consideraciones
        </h2>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <p className="text-gray-700 mb-4">
            Para la mayoría de las mujeres que comienzan a tomar THS antes de los 60 años, los beneficios superan los riesgos. Sin embargo, existen algunos factores a considerar:
          </p>
          
          <div className="space-y-4">
            <div className="flex items-start">
              <AlertCircle className="text-amber-600 mr-3 mt-1 flex-shrink-0" size={20} />
              <div>
                <strong className="text-gray-800">Riesgo de cáncer de mama:</strong>
                <p className="text-gray-700">Tomar THS combinada (estrógeno y progestágeno) puede estar asociado con un pequeño riesgo de desarrollar cáncer de mama. Sin embargo, algunos estudios muestran que este riesgo se reduce si se usa progesterona micronizada. El riesgo de cáncer de mama con cualquier tipo de THS es bajo; a modo de comparación, el riesgo de cáncer de mama es mayor en una mujer que es obesa o que bebe una cantidad moderada de alcohol.</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <AlertCircle className="text-amber-600 mr-3 mt-1 flex-shrink-0" size={20} />
              <div>
                <strong className="text-gray-800">Riesgo de coágulos sanguíneos:</strong>
                <p className="text-gray-700">Si una mujer tiene antecedentes de coágulos sanguíneos, enfermedad hepática o migraña, existe un pequeño riesgo de coagulación si toma la cápsula de estrógeno, pero tomarla a través de la piel como un parche, gel o spray no tiene estos riesgos, por lo que es seguro para estas mujeres.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-purple-700 mb-4">
          Efectos Secundarios
        </h2>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <p className="text-gray-700 mb-4">
            Los efectos secundarios de la THS son poco frecuentes, pero pueden incluir:
          </p>
          <ul className="list-disc pl-6 text-gray-700 space-y-2">
            <li>Sensibilidad en los senos</li>
            <li>Sangrado irregular</li>
            <li>Náuseas (generalmente temporales)</li>
            <li>Dolores de cabeza</li>
            <li>Cambios de humor</li>
          </ul>
          <p className="text-gray-700 mt-4">
            Si ocurren, generalmente aparecen dentro de los primeros meses de tomar la THS y luego se asientan con el tiempo a medida que tu cuerpo se adapta a las hormonas.
          </p>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-purple-700 mb-4">
          ¿Cuándo Comenzar la THS?
        </h2>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-start mb-4">
            <Clock className="text-purple-600 mr-3 mt-1 flex-shrink-0" size={20} />
            <p className="text-gray-700">
              La THS es más efectiva si comienza cuando eres perimenopáusica, esto es <strong>antes</strong> de tu "menopausia" oficial, que es 12 meses después de tu último período. Esto significa que no tienes que esperar a que tus períodos se detengan antes de comenzar la THS.
            </p>
          </div>
          
          <p className="text-gray-700 mb-4">
            Tu primer paso debe ser hablar con un profesional de la salud sobre las opciones disponibles para ti. No esperes hasta que los síntomas se vuelvan inmanejables antes de buscar consejo.
          </p>
          
          <p className="text-gray-700">
            Los mayores beneficios para la salud de tomar THS se encuentran en mujeres que comienzan a tomar THS dentro de los 10 años de su menopausia, pero generalmente las mujeres de cualquier edad pueden comenzar a tomar THS.
          </p>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-purple-700 mb-4">
          Puntos Clave a Recordar
        </h2>
        <div className="bg-purple-50 p-6 rounded-lg">
          <ul className="space-y-4">
            <li className="flex items-start">
              <HelpCircle className="text-purple-600 mr-3 mt-1 flex-shrink-0" size={20} />
              <p className="text-gray-700">
                <strong>Hay más beneficios para tu salud si comienzas la THS temprano</strong>, no esperes a que tus síntomas empeoren.
              </p>
            </li>
            <li className="flex items-start">
              <HelpCircle className="text-purple-600 mr-3 mt-1 flex-shrink-0" size={20} />
              <p className="text-gray-700">
                <strong>La menopausia significa vivir con una deficiencia hormonal a largo plazo</strong> que si no se trata aumentará tu riesgo de osteoporosis y enfermedades cardíacas en el futuro.
              </p>
            </li>
            <li className="flex items-start">
              <HelpCircle className="text-purple-600 mr-3 mt-1 flex-shrink-0" size={20} />
              <p className="text-gray-700">
                <strong>No hay un período máximo de tiempo durante el cual puedas tomar THS</strong>, puedes tomarla durante el tiempo que sea necesario.
              </p>
            </li>
            <li className="flex items-start">
              <HelpCircle className="text-purple-600 mr-3 mt-1 flex-shrink-0" size={20} />
              <p className="text-gray-700">
                <strong>La THS no "retrasa" tu menopausia</strong>. Si tienes síntomas menopáusicos después de suspender la THS, esto significa que aún tendrías síntomas incluso si nunca hubieras tomado THS.
              </p>
            </li>
            <li className="flex items-start">
              <HelpCircle className="text-purple-600 mr-3 mt-1 flex-shrink-0" size={20} />
              <p className="text-gray-700">
                <strong>Los beneficios de la THS deben equilibrarse con cualquier riesgo</strong>. Tú tienes que decidir lo que es adecuado para ti dependiendo de tus circunstancias individuales y en discusión con tu profesional de la salud.
              </p>
            </li>
          </ul>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-purple-700 mb-4">
          Consulta con Profesionales
        </h2>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <p className="text-gray-700 mb-4">
            Es importante recordar que la decisión de iniciar la THS debe tomarse en consulta con un profesional de la salud, quien evaluará tu historial médico, tus síntomas y tus factores de riesgo personales.
          </p>
          <p className="text-gray-700 mb-6">
            En Olivia, te conectamos con especialistas en menopausia que pueden ayudarte a tomar decisiones informadas sobre la THS y otros tratamientos disponibles.
          </p>
          <a
            href="/professionals"
            className="bg-purple-600 text-white py-3 px-6 rounded-lg hover:bg-purple-700 transition-colors inline-flex items-center"
          >
            Consultar con Profesionales
          </a>
        </div>
      </section>
    </div>
  );
};

export default TerapiaHormonalSustitutiva;