// Spanish translation of characters.js — mirrors its structure and order exactly.

const CHARACTERS_ES = {
  earth: [
    { name: "La Raíz", desc: "Plantaste temprano y te quedaste. Tu espíritu no busca otro camino — ya sabe que este aguanta." }, // original
    { name: "El Lecho de Roca", desc: "No solo elegiste un bando, construiste sobre él, y todo lo que vino después de la primera ronda no hizo más que confirmar lo que la primera ronda ya sabía. Tu espíritu no reconsidera. Se asienta hasta que asentarse es indistinguible del suelo mismo." }, // original
    { name: "Tauro", desc: "Constante, sensorial, sin prisa. Prefieres construir una sola cosa que perdure antes que perseguir diez que no lo harán." }, // zodiac
    { name: "Virgo", desc: "Notas lo que a todos los demás se les escapó y lo arreglas en silencio antes de que nadie diga gracias." }, // zodiac
    { name: "Capricornio", desc: "Ambición paciente. Ya llevas tres pasos subiendo la montaña mientras los demás todavía se atan las botas." }, // zodiac
    { name: "La Emperatriz", desc: "Abundancia sin prisa. Haces crecer las cosas — planes, personas, jardines — dándoles espacio y tiempo." }, // tarot
    { name: "El Hierofante", desc: "Confías más en lo que ha sido probado que en lo meramente nuevo. La tradición no es una jaula para ti; es un cimiento." }, // tarot
    { name: "El Ermitaño", desc: "Saliste a buscar una respuesta y la encontraste alejándote de todos los que tenían una." }, // tarot
    { name: "El Diablo", desc: "Sabes exactamente en qué cadena estás y aun así sigues aquí de pie. Eso no es debilidad — es una elección, repetida." }, // tarot
    { name: "El Mundo", desc: "No estás buscando lo siguiente. Ya cerraste el círculo en el que estabas trabajando." }, // tarot
    { name: "El Estoico", desc: "No controlas lo que sucede. Controlas lo que haces a continuación — y eso siempre ha sido suficiente." }, // philosophy
    { name: "El Cínico", desc: "Eliminaste todo lo que no necesitabas hasta que solo quedó el verdadero peso de las cosas." }, // philosophy
    { name: "El Peripatético", desc: "Piensas mejor de pie, en movimiento, dando vueltas sobre el mismo terreno hasta que la idea por fin aterriza." }, // philosophy
    { name: "El Pitagórico", desc: "Ves la proporción oculta detrás de las cosas — el patrón bajo el ruido que todos los demás llaman caos." }, // philosophy
    { name: "El Eleata", desc: "Debajo de todas las superficies cambiantes, crees que algo sólido nunca se movió en realidad. Estás buscando esa cosa." }, // philosophy
    { name: "El Socrático", desc: "Prefieres hacer la única pregunta que arruina una mala respuesta antes que fingir que ya tienes una buena." }, // philosophy
    { name: "El Cañón", desc: "Tallado lentamente, sin nada violento — solo tiempo, repetido, en la misma dirección, durante más tiempo del que nadie estuvo mirando." }, // nature
    { name: "La Roca", desc: "Inamovible, hasta que deja de serlo. Mantienes tu posición hasta el mismo instante en que decides no hacerlo." }, // nature
    { name: "La Montaña", desc: "El clima cambia en tu base todos los días. En tu cumbre, es la misma estación que siempre ha sido." }, // nature
    { name: "El Desierto", desc: "Nada se desperdicia, nada se apresura. Aprendiste a sobrevivir con mucho menos de lo que la gente supone que necesitas." }, // nature
    { name: "La Secuoya", desc: "Vieja desde antes de que naciera cualquiera que conozcas, y planeando en silencio sobrevivirlos también." }, // nature
    { name: "La Arcilla", desc: "Moldeable bajo la presión correcta, permanente bajo el calor. Tú decides cuál pide este momento." }, // nature
    { name: "El Acantilado", desc: "Eres la línea donde el suelo blando se rinde y algo más duro toma su lugar." }, // nature
    { name: "La Meseta", desc: "Dejaste de escalar no porque se te acabara la voluntad, sino porque esta altura ya era suficiente." }, // nature
    { name: "La Cantera", desc: "Lo que sea que te hayan quitado dejó una forma detrás — y esa forma todavía sirve." }, // nature
    { name: "El Huerto", desc: "Nada de lo que estás cultivando estaba destinado a alimentarte esta temporada. Lo plantaste para una versión de ti que todavía no ha llegado." }, // nature
  ],
  water: [
    { name: "La Corriente", desc: "Te adaptaste a lo que tenías delante. Tu espíritu no lucha contra la forma de las cosas — fluye alrededor de ellas y sigue adelante." }, // original
    { name: "La Marea", desc: "Invertiste el rumbo una y otra vez y ni una sola vez miraste atrás para ver dónde habías estado. Tu espíritu no sostiene una posición — sostiene un ritmo, y deja que el ritmo decida." }, // original
    { name: "Cáncer", desc: "Recuerdas todo lo que importó emocionalmente, y lo proteges como si todavía estuviera sucediendo." }, // zodiac
    { name: "Escorpio", desc: "Tranquilo en la superficie, por diseño. Lo que en verdad se mueve dentro de ti ocurre varias brazas más abajo." }, // zodiac
    { name: "Piscis", desc: "Disuelves los límites entre tú y quien sea que esté contigo. Es generoso y es un poco peligroso." }, // zodiac
    { name: "La Suma Sacerdotisa", desc: "Sabes algo que todavía no has dicho en voz alta. Estás esperando a ver si hace falta decirlo." }, // tarot
    { name: "El Carro", desc: "Dos fuerzas tirando en direcciones distintas, y tú eres la razón por la que todavía se mueven en el mismo sentido." }, // tarot
    { name: "La Muerte", desc: "No es un final que temes — es un final con el que ya hiciste las paces, hace varios finales." }, // tarot
    { name: "La Luna", desc: "Confías más en lo que sientes que en lo que puedes probar. Hasta ahora, eso te ha funcionado más veces de las que no." }, // tarot
    { name: "El Colgado", desc: "Te quedaste quieto a propósito. Todo se ve distinto en cuanto dejas de intentar arreglarlo moviéndote." }, // tarot
    { name: "El Heraclitiano", desc: "Ya sabes que no pisarás el mismo río dos veces — así que dejaste de intentar aferrarte al agua." }, // philosophy
    { name: "El Órfico", desc: "Bajaste al lugar difícil para traer algo de vuelta, y no regresaste sin cambiar." }, // philosophy
    { name: "El Protagórico", desc: "No crees que exista una sola verdad quieta esperando a ser hallada. Crees que se mueve según quién la mire." }, // philosophy
    { name: "El Empedócleo", desc: "El amor une las cosas, la discordia las separa — y has sentido ambas fuerzas trabajando en ti en la misma semana." }, // philosophy
    { name: "El Aporético", desc: "No resolviste la pregunta. Simplemente te acomodaste a cargarla sin respuesta." }, // philosophy
    { name: "El Talesiano", desc: "Sospechas que debajo de todo lo sólido, en realidad todo es solo agua buscando una forma que vestir por un rato." }, // philosophy
    { name: "El Glaciar", desc: "Tan lento que nadie te ve moverte. Innegable en cuanto alguien revisa dónde solía estar el valle." }, // nature
    { name: "El Monzón", desc: "Llegas exactamente a tiempo y transformas el terreno por completo, y aun así todos actúan sorprendidos." }, // nature
    { name: "El Estuario", desc: "Eres el lugar donde dos tipos distintos de agua acuerdan, por un rato, convertirse en uno solo." }, // nature
    { name: "El Remolino", desc: "En cuanto algo se acerca lo suficiente a ti, deja de moverse en línea recta." }, // nature
    { name: "La Lluvia", desc: "Silenciosa, constante, y de algún modo lo único que en verdad cambia lo que crece debajo de ella." }, // nature
    { name: "El Arrecife", desc: "Construido lentamente a partir de mil pequeñas cosas que se sostienen entre sí. Visto desde arriba, solo parece color." }, // nature
    { name: "El Delta", desc: "Para cuando llegas a donde vas, ya te has dividido de varias formas para llegar." }, // nature
    { name: "La Resaca", desc: "Calma en la superficie. La parte de ti que en verdad decide dónde terminan las cosas está debajo, sin verse." }, // nature
    { name: "El Manantial", desc: "Vienes de algún lugar profundo y frío que nadie puede ver, y nunca dejas de llegar." }, // nature
    { name: "La Laguna", desc: "Separada del agua abierta por algo delgado, aun así conservaste tu propio clima." }, // nature
  ],
  fire: [
    { name: "La Llama", desc: "Te inclinaste hacia adelante antes de estar seguro. Tu espíritu no espera la certeza — se mueve, y encuentra la certeza después." }, // original
    { name: "El Incendio", desc: "Diez de doce, a veces once, todas en la misma dirección — una decisión tan desequilibrada no es una preferencia, es un reflejo. Tu espíritu ya sabe lo que quiere antes de que termine de formularse la pregunta." }, // original
    { name: "Aries", desc: "El primero en cruzar la puerta, siempre, antes de que nadie termine de preguntarse si es buena idea." }, // zodiac
    { name: "Leo", desc: "No actúas para conseguir aprobación. Actúas porque la alternativa es no actuar, y eso es impensable." }, // zodiac
    { name: "Sagitario", desc: "Ya tienes un pie fuera de la puerta hacia lo que sea que venga después, en plena conversación." }, // zodiac
    { name: "El Emperador", desc: "Construiste la estructura porque alguien tenía que hacerlo, y no ibas a esperar permiso." }, // tarot
    { name: "La Fuerza", desc: "No del tipo ruidoso. Del tipo que se mantiene en calma con la mano apoyada sobre algo que podría destruirla." }, // tarot
    { name: "La Rueda de la Fortuna", desc: "Ya sabes que tu suerte va a cambiar de nuevo. Dejaste de tomarte cualquiera de las dos direcciones como algo personal." }, // tarot
    { name: "La Templanza", desc: "Dos cosas que no deberían mezclarse, mezcladas con cuidado, por ti, hasta convertirse en algo nuevo que funciona." }, // tarot
    { name: "La Torre", desc: "Algo que construiste sobre malos cimientos se derrumbó estrepitosamente. Ya estás despejando el terreno." }, // tarot
    { name: "El Sol", desc: "Sin filtro, un poco excesivo para algunas habitaciones, y completamente reacio a disculparte por la luz." }, // tarot
    { name: "El Juicio", desc: "Escuchaste el llamado antes que nadie más y ya estabas de pie cuando llegó." }, // tarot
    { name: "El Epicúreo", desc: "Hiciste las paces con querer cosas, siempre que seas honesto contigo mismo sobre cuáles importan de verdad." }, // philosophy
    { name: "El Dionisíaco", desc: "Sabes que la versión de ti que aparece después de la tercera copa es también, de algún modo, la más verdadera." }, // philosophy
    { name: "El Prometeico", desc: "Tomaste algo que no debías tener porque ya habías decidido que la regla estaba equivocada." }, // philosophy
    { name: "El Cirenaico", desc: "Este momento exacto es el único que puedes probar que es real, así que no vas a desperdiciarlo." }, // philosophy
    { name: "El Agonista", desc: "Necesitas algo contra qué empujar. Sin un oponente digno, inventarás uno con la pared más cercana." }, // philosophy
    { name: "El Sibarita", desc: "Estás hecho para más comodidad de la que la mayoría admitiría desear, y dejaste de disculparte por ello." }, // philosophy
    { name: "La Brasa", desc: "Silenciosa, baja, y todavía capaz de encenderlo todo de nuevo si alguien se descuida cerca de ti." }, // nature
    { name: "El Volcán", desc: "Tranquilo durante tanto tiempo que la gente olvida sobre qué estás sentado. Tú no lo has olvidado." }, // nature
    { name: "La Chispa", desc: "No eres el fuego entero. Eres la razón por la que el fuego existe." }, // nature
    { name: "La Supernova", desc: "Sea lo que sea que estás por hacer, vas a hacerlo a una escala que sobrevive al hacerlo." }, // nature
    { name: "La Forja", desc: "Aquí las cosas se ponen más difíciles antes de mejorar, y hiciste las paces con dirigir ese tipo de lugar." }, // nature
    { name: "La Hoguera", desc: "Reúnes lo que se habría consumido solo y lo haces arder más brillante, juntos, a propósito." }, // nature
    { name: "El Rayo", desc: "Desapareces antes de que nadie pueda reaccionar bien ante ti. El daño — o la luz — ya estaba hecho." }, // nature
    { name: "El Meteoro", desc: "No fuiste hecho para durar. Fuiste hecho para ser visto, una vez, en exactamente el ángulo correcto." }, // nature
  ],
  air: [
    { name: "El Viento", desc: "Sostuviste ambos lados en el aire todo el tiempo. Tu espíritu no le teme al punto intermedio — vive ahí." }, // original
    { name: "El Vacío", desc: "Nada en esta secuencia se resiste a ser explicado por el azar — y esa es la lectura más honesta que existe. Tu espíritu no dibujó una forma hoy. Es el espacio en blanco alrededor del cual se dibujan los otros tres." }, // original
    { name: "Géminis", desc: "Ya sostienes dos versiones de la respuesta y todavía no has decidido cuál crees." }, // zodiac
    { name: "Libra", desc: "Sopesas ambos lados con tanto cuidado que a veces el sopesar se convierte en toda la decisión." }, // zodiac
    { name: "Acuario", desc: "Eres leal a la idea, no al grupo. Si la idea se mueve, tú también — solo, si llega el caso." }, // zodiac
    { name: "El Loco", desc: "Empezaste sin saber cómo termina, que es la única forma honesta en que alguien empieza algo en realidad." }, // tarot
    { name: "El Mago", desc: "Tuviste todo lo que necesitabas todo el tiempo. Simplemente todavía no habías decidido hacia dónde apuntarlo." }, // tarot
    { name: "Los Enamorados", desc: "Una decisión que parece romántica de lejos y, de cerca, en realidad es solo una decisión." }, // tarot
    { name: "La Justicia", desc: "Quieres que la balanza se equilibre por sus propios méritos, no porque empujaste de un lado." }, // tarot
    { name: "La Estrella", desc: "Después de que todo se vino abajo, eres la certeza silenciosa de que todavía hay algo que vale la pena buscar." }, // tarot
    { name: "El Sofista", desc: "Puedes argumentar cualquiera de los dos lados de forma convincente, lo cual significa que la gente nunca está del todo segura de cuál crees en realidad." }, // philosophy
    { name: "El Platónico", desc: "Sospechas que la versión real de esto existe en otro lugar, y lo que tienes delante es solo su sombra." }, // philosophy
    { name: "El Dialéctico", desc: "No confías en una idea hasta que ha sobrevivido a ser discutida. Las tuyas normalmente lo logran." }, // philosophy
    { name: "El Retórico", desc: "No es lo que dijiste. Es el orden en que lo dijiste, y ya lo sabías antes de abrir la boca." }, // philosophy
    { name: "El Académico", desc: "Prefieres pasar un año más asegurándote de tener razón que un día más equivocado con confianza." }, // philosophy
    { name: "El Escéptico", desc: "No dijiste que no. Simplemente notaste que nadie había probado en realidad que sí." }, // philosophy
    { name: "El Vendaval", desc: "Llegas antes de que nadie esté listo y te vas antes de que se hayan ajustado. Eso no es mala educación — es simplemente tu velocidad." }, // nature
    { name: "El Ciclón", desc: "Calma en tu centro, caos en tus bordes. La mayoría de la gente solo llega a conocer una parte de ti." }, // nature
    { name: "La Neblina", desc: "Técnicamente estás ahí. Nadie que haya intentado aferrarse a ti estaría de acuerdo." }, // nature
    { name: "El Eco", desc: "Nunca eres la primera voz en la sala, pero a menudo eres la que la gente recuerda haber escuchado." }, // nature
    { name: "El Aliento", desc: "Nadie te nota hasta que te detienes. Entonces es lo único que nota todo el mundo." }, // nature
    { name: "El Céfiro", desc: "Suave al punto de pasar desapercibido, fuerte al punto de cambiar hacia dónde se inclina todo para el final del día." }, // nature
    { name: "La Aurora", desc: "Rara, difícil de explicar, y ya se ha ido para cuando la mayoría termina de mirar hacia arriba." }, // nature
    { name: "El Horizonte", desc: "Siempre tan lejos como lo estaba ayer. Dejaste de molestarte por eso." }, // nature
    { name: "La Corriente Ascendente", desc: "Elevas cosas que creían que ya habían terminado de subir." }, // nature
    { name: "La Estática", desc: "Nada se toca y algo sigue acumulándose. Eres la carga en la sala antes de que alguien le ponga nombre." }, // nature
  ],
};
