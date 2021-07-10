
use biblioteca;

db.createCollection("autores");

db.autores.insertMany([
  {
    nombre: "Roberto Gonzales",
    centro_trabajo: "Universidad de Costa Rica",
    correo_electronico: "rgonzalez@gmail.com",
    temas_laborales: "Ingenieria",
  },
  {
    nombre: "María Quirós",
    centro_trabajo: "Universidad lationoamericana de ciencia y tencnologia",
    correo_electronico: "mquiros@gmail.com",
    temas_laborales: "Quimica",
  },
  {
    nombre: "Alejandro Salguero",
    centro_trabajo: "Universidad lationoamericana de ciencia y tencnologia",
    correo_electronico: "asalguero@gmail.com",
    temas_laborales: "Ingenieria",
  },
]);

db.createCollection("congresos");

db.congresos.insertMany([
  {
    nombre: "Congresos de desarrolladores de software",
    fecha_inicio:"01-01-1990",
    fecha_fin: "05-01-1990",
    ciudad: "San Jose",
    anio_primeravez: "1990",
    tipo_congreso: "nacional",
    pais: "Costa Rica",
    frecuencia: "Anual"
  },
    {
    nombre: "Congresos de quimicos asociados",
    fecha_inicio:"25-11-2010",
    fecha_fin: "30-11-2010",
    ciudad: "San Jose",
    anio_primeravez: "1990",
    tipo_congreso: "internacional",
    pais: "Ciudad de México",
    frecuencia: "trimestral"
  },
   {
    nombre: "Desarrollo web",
    fecha_inicio:"20-05-2019",
    fecha_fin: "20-05-2019",
    ciudad: "Heredia",
    anio_primeravez: "2018",
    tipo_congreso: "nacional",
    pais: "Costa Rica",
    frecuencia: "Semestral"
  },
]);

db.createCollection("revistas");

db.revistas.insertMany([
  {
    nombre: "El software",
    editor: "Enrique Gomez",
    temas: "Ingenieria informatica, desarrollo profesional, humor, geek",
    numero_revista: "5",
    anio:"2020",
    anio_publicacion: "2019",
    paginas: "10-11",
    frecuencia: "Anual"
  },{
    nombre: "Qumica aplicada",
    editor: "Julia Benavides",
    temas: "fisica, quimica, biologia, ciencias",
    numero_revista: "50",
    anio:"2020",
    anio_publicacion: "2010",
    paginas: "20-22",
    frecuencia: "Mensual"
  },{
    nombre: "Qumica en la vida cotidiana",
    editor: "Julia Benavides",
    temas: "quimica, vida diaria, tips",
    numero_revista: "2",
    anio:"2020",
    anio_publicacion: "2019",
    paginas: "5-10",
    frecuencia: "Anual"
  },
]);

db.createCollection("informes");

db.informes.insertMany([
  {
    numero: "1",
    centro_publicacion: "ULACIT",
    mes_publicacion: "5",
    anio_publicacion: "2014",
  },
  {
    numero: "2",
    centro_publicacion: "ULACIT",
    mes_publicacion: "2",
    anio_publicacion: "2015",
  },
  {
    numero: "3",
    centro_publicacion: "Enrique Gomez",
    mes_publicacion: "12",
    anio_publicacion: "2018",
  }
]);

db.createCollection("articulos");

db.articulos.insertMany([
  {
    titulo:"C# vs Java",
    autores: [ObjectId("60e8e85319078814002a6552")],
    palabras_clave:['c#','java','oop'],
    correo_electronico: "asalguero@gmail.com",
    copiaEnGrupo:true,
    ubicacionCopiaGrupo: "Despacho",
    tipoArticulo: "Informe",
    congreso: null,
    revista: null,
    informe: ObjectId("60e8f36119078814002a6559")
},
{
    titulo:"Ingenieria y ciencia de la mano",
    autores:[ObjectId("60e8e85319078814002a6550"),ObjectId("60e8e85319078814002a6551")],
    palabras_clave:['ciencias', 'IT', 'union','software'],
    correo_electronico:"recursos@ucr.ac.cr",
    copiaEnGrupo:false,
    ubicacionCopiaGrupo:"",
    tipoArticulo:"Revista",
    congreso:null,
    revista: ObjectId("60e8f36119078814002a6559"),
    informe: null
},
{
    titulo:"Programacion Orientada a objetos",
    autores:[ObjectId("60e8e85319078814002a6550")],
    palabras_clave:['Ingeniera', 'sotftware','backend'],
    correo_electronico:"ingenieria@ulacit.ac.cr",
    copiaEnGrupo:true,
    ubicacionCopiaGrupo:"Despacho",
    tipoArticulo:"Congreso",
    congreso: ObjectId("60e8f20019078814002a6555"),
    revista: null,
    informe: null
}
]);
