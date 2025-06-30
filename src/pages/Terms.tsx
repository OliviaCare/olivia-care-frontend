import React from "react";
import { Mail } from "lucide-react";

const Terms: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <div className="bg-white rounded-lg shadow-md p-8">
        <h1 className="text-3xl font-bold text-purple-800 mb-4">
          Términos de Uso
        </h1>
        <p className="text-gray-600 mb-8">
          Última actualización: 11 de abril de 2025
        </p>

        <div className="prose prose-purple max-w-none">
          <p className="text-gray-700 mb-8">
            ¡Gracias por utilizar Olivia! A continuación te explicamos las
            condiciones que rigen el uso de nuestra plataforma digital.
          </p>

          <section className="mb-8">
            <h3 className="text-xl font-semibold text-purple-700 mb-4">
              1. Titular de la Plataforma
            </h3>
            <p className="text-gray-700">
              Esta plataforma es titularidad de Byld Startups, S.L., con
              domicilio en C/ Julio López 6, 28002, Madrid, Spain, CIF
              B87817904, inscrita en el Registro Mercantil de Madrid, pudiendo
              ser contactada en{" "}
              <a
                href="mailto:olivia@byld.es"
                className="text-purple-600 hover:text-purple-800"
              >
                olivia@byld.es
              </a>
              .
            </p>
          </section>

          <section className="mb-8">
            <h3 className="text-xl font-semibold text-purple-700 mb-4">
              2. Aceptación de los Términos
            </h3>
            <p className="text-gray-700">
              Al acceder o utilizar la plataforma Olivia, aceptas cumplir y
              estar sujeto a estos Términos de Uso. Si no estás de acuerdo con
              estos términos, no debes utilizar nuestra plataforma. El acceso,
              navegación o utilización de la plataforma implica la aceptación
              plena y sin reservas de los presentes Términos.
            </p>
          </section>

          <section className="mb-8">
            <h3 className="text-xl font-semibold text-purple-700 mb-4">
              3. Descripción del Servicio
            </h3>
            <p className="text-gray-700">
              Olivia es una plataforma digital que ofrece planes personalizados
              y holísticos para mujeres en la menopausia, con el objetivo de
              ayudarles a gestionar los síntomas y mejorar su bienestar. Los
              servicios incluyen planes de bienestar, contenido educativo y
              acceso a profesionales del bienestar, pero no sustituyen en ningún
              caso la consulta médica profesional.
            </p>
          </section>

          <section className="mb-8">
            <h3 className="text-xl font-semibold text-purple-700 mb-4">
              4. Elegibilidad
            </h3>
            <p className="text-gray-700">
              Para utilizar Olivia, debes tener al menos 18 años de edad. Al
              registrarte, confirmas que cumples con este requisito y que toda
              la información proporcionada es veraz y precisa. El uso por parte
              de menores de edad está prohibido.
            </p>
          </section>

          <section className="mb-8">
            <h3 className="text-xl font-semibold text-purple-700 mb-4">
              5. Registro y Cuenta
            </h3>
            <div className="text-gray-700">
              <p className="mb-4">
                <strong>Información de Registro:</strong> Debes proporcionar
                información precisa y completa al registrarte. Eres responsable
                de mantener la seguridad de tu cuenta.
              </p>
              <p>
                <strong>Confidencialidad:</strong> Eres responsable de mantener
                la confidencialidad de tu contraseña. Si detectas un uso no
                autorizado, notifícanos de inmediato.
              </p>
            </div>
          </section>

          <section className="mb-8">
            <h3 className="text-xl font-semibold text-purple-700 mb-4">
              6. Uso Permitido
            </h3>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>
                Los servicios de Olivia son para uso personal y no comercial.
              </li>
              <li>
                No está permitido copiar, modificar, distribuir ni revender
                ningún contenido.
              </li>
              <li>
                No debes utilizar la plataforma para actividades ilegales,
                dañinas o que interfieran con su funcionamiento.
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h3 className="text-xl font-semibold text-purple-700 mb-4">
              7. Comportamiento del Usuario
            </h3>
            <p className="text-gray-700 mb-4">
              Las usuarias deben comportarse de manera respetuosa. Está
              prohibido:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>Acosar o usar lenguaje ofensivo.</li>
              <li>Suplantar a otra persona.</li>
              <li>Realizar spam o actividades promocionales no autorizadas.</li>
            </ul>
            <p className="text-gray-700 mt-4">
              Nos reservamos el derecho de eliminar cuentas o contenido que
              infrinjan estas normas.
            </p>
          </section>

          <section className="mb-8">
            <h3 className="text-xl font-semibold text-purple-700 mb-4">
              8. Derechos de Propiedad Intelectual
            </h3>
            <p className="text-gray-700">
              Todos los derechos sobre el contenido de la plataforma, incluyendo
              textos, gráficos, logos y software, pertenecen a Olivia o a sus
              licenciantes. Se otorga una licencia limitada, no exclusiva y
              revocable para acceder y utilizar la plataforma.
            </p>
          </section>

          <section className="mb-8">
            <h3 className="text-xl font-semibold text-purple-700 mb-4">
              9. Exención de Asesoramiento Médico
            </h3>
            <p className="text-gray-700">
              Olivia no proporciona servicios médicos, diagnósticos, ni
              asesoramiento profesional sanitario. Todo el contenido ofrecido en
              la plataforma tiene fines meramente informativos y de apoyo. Las
              recomendaciones personalizadas se basan en la información
              facilitada por la usuaria y no sustituyen una evaluación médica
              individual. Siempre debes consultar a un médico u otro profesional
              de la salud cualificado antes de tomar decisiones relacionadas con
              tu salud.
            </p>
          </section>

          <section className="mb-8">
            <h3 className="text-xl font-semibold text-purple-700 mb-4">
              10. Exclusión de Garantías y de Responsabilidad
            </h3>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>El uso de Olivia es bajo tu propio riesgo.</li>
              <li>
                No garantizamos que el servicio estará libre de errores ni que
                los resultados serán exactos.
              </li>
              <li>
                Olivia no es responsable por daños indirectos, fallos técnicos,
                ataques informáticos o interrupciones del servicio por causas
                externas (como caídas de red, fuerza mayor, etc.).
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h3 className="text-xl font-semibold text-purple-700 mb-4">
              11. Contenido de Terceros y Enlaces Externos
            </h3>
            <p className="text-gray-700">
              Olivia puede incluir enlaces a sitios web externos. No somos
              responsables por su contenido, exactitud ni políticas.
              Recomendamos revisar sus términos antes de interactuar con ellos.
            </p>
          </section>

          <section className="mb-8">
            <h3 className="text-xl font-semibold text-purple-700 mb-4">
              12. Pagos y Suscripciones
            </h3>
            <p className="text-gray-700">
              Algunos servicios están disponibles mediante suscripción paga. Al
              suscribirte, aceptas pagar las tarifas indicadas. Puedes cancelar
              tu suscripción en cualquier momento. No se ofrecerán reembolsos
              por pagos ya realizados, salvo que la ley lo exija.
            </p>
          </section>

          <section className="mb-8">
            <h3 className="text-xl font-semibold text-purple-700 mb-4">
              13. Cancelaciones, Reprogramaciones y Reembolsos
            </h3>
            <div className="text-gray-700">
              <p className="mb-4">
                Las usuarias podrán cancelar o reprogramar una cita con al menos
                24 horas de antelación respecto a la hora prevista. Para ello,
                deberán hacerlo a través del enlace incluido en el correo de
                confirmación de la cita, o bien escribiendo a nuestro equipo a{" "}
                <a
                  href="mailto:hola@olivia.es"
                  className="text-purple-600 hover:text-purple-800"
                >
                  hola@olivia.es
                </a>
                .
              </p>
              <p className="mb-4">
                Las cancelaciones realizadas con menos de 24 horas de antelación
                no serán reembolsables.
              </p>
              <p>
                En caso de que la cancelación sea realizada por el profesional o
                por causas atribuibles a Olivia, se ofrecerá a la usuaria la
                posibilidad de reprogramar sin coste o, si lo prefiere, obtener
                el reembolso íntegro del importe abonado.
              </p>
            </div>
          </section>

          <section className="mb-8">
            <h3 className="text-xl font-semibold text-purple-700 mb-4">
              14. Modificaciones del Servicio
            </h3>
            <p className="text-gray-700">
              Podemos modificar, suspender o descontinuar partes de la
              plataforma en cualquier momento, con o sin previo aviso. Nos
              reservamos el derecho a suspender permanentemente el servicio o
              cerrar la plataforma, notificando a las usuarias con la debida
              antelación siempre que sea posible.
            </p>
          </section>

          <section className="mb-8">
            <h3 className="text-xl font-semibold text-purple-700 mb-4">
              15. Indemnización
            </h3>
            <p className="text-gray-700">
              Aceptas indemnizar a Olivia frente a cualquier reclamación o daño
              derivado de tu uso indebido de la plataforma o del incumplimiento
              de estos Términos.
            </p>
          </section>

          <section className="mb-8">
            <h3 className="text-xl font-semibold text-purple-700 mb-4">
              16. Cambios en los Términos
            </h3>
            <p className="text-gray-700">
              Podemos modificar estos Términos de Uso. Te notificaremos sobre
              cambios importantes mediante la plataforma o por correo
              electrónico. El uso continuado implica aceptación.
            </p>
          </section>

          <section className="mb-8">
            <h3 className="text-xl font-semibold text-purple-700 mb-4">
              17. Protección de Datos y Cookies
            </h3>
            <p className="text-gray-700">
              Tus datos serán tratados según nuestra Política de Privacidad y
              Política de Cookies. Al utilizar la plataforma, aceptas estas
              políticas. Puedes ejercer tus derechos escribiendo a{" "}
              <a
                href="mailto:olivia@byld.es"
                className="text-purple-600 hover:text-purple-800"
              >
                olivia@byld.es
              </a>
              .
            </p>
          </section>

          <section className="mb-8">
            <h3 className="text-xl font-semibold text-purple-700 mb-4">
              18. Ley Aplicable y Jurisdicción
            </h3>
            <p className="text-gray-700">
              Estos Términos se rigen por la legislación española. Las partes se
              someten a los tribunales de Madrid (España), salvo disposición
              legal en contrario para consumidores.
            </p>
          </section>

          <section className="mb-8">
            <h3 className="text-xl font-semibold text-purple-700 mb-4">
              19. Resolución Alternativa de Conflictos
            </h3>
            <p className="text-gray-700">
              La Comisión Europea pone a disposición de los consumidores una
              plataforma de resolución de litigios online:{" "}
              <a
                href="http://ec.europa.eu/consumers/odr/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple-600 hover:text-purple-800"
              >
                http://ec.europa.eu/consumers/odr/
              </a>
            </p>
          </section>

          <section className="mb-8">
            <h3 className="text-xl font-semibold text-purple-700 mb-4">
              20. Idioma
            </h3>
            <p className="text-gray-700">
              En caso de discrepancia entre versiones traducidas de estos
              Términos, prevalecerá la versión redactada en español.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Terms;
