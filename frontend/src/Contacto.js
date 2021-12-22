import emailjs from 'emailjs-com';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export default function Contacto() {
  const userSignin = useSelector(state => state.userSignin);
  const { userInfo } = userSignin;

  function sendEmail(e) {
    e.preventDefault();
    emailjs.sendForm('service_ehpi6v9', 'template_b3rdkf5', e.target, 'user_rV8QRiqSHPrul084aSGPh').then(
      result => {
        alert('Mensaje Enviado!. Gracias por contactarnos.');
      },
      error => {
        alert(error.text);
      }
    );
    e.target.reset();
  }

  return (
    <div>
      <div className="contacto-container">
        <form className="form contacto" onSubmit={sendEmail}>
          <div className="form-title">
            <h1>ESCRIBENOS</h1>
          </div>
          <div className="inputDiv">
            <label>Nombre</label>
            <input type="text" defaultValue={userInfo?.nombre} name="from_name" required autoComplete="off"></input>
          </div>
          <div className="inputDiv">
            <label>Tu Email</label>
            <input type="text" defaultValue={userInfo?.email} name="from_email" required autoComplete="off"></input>
          </div>
          <div className="inputDiv">
            <label>Telefono</label>
            <input
              type="text"
              placeholder="ingresa 1 o 2 telefonos"
              name="telefono"
              required
              autoComplete="off"
            ></input>
          </div>
          <div className="inputDiv">
            <label>Asunto</label>
            <input type="text" name="subject" required autoComplete="off"></input>
          </div>
          <div className="texto">
            <textarea id="" cols="30" rows="5" placeholder="Escribe tu mensaje aqui....." name="message"></textarea>
          </div>
          <div>
            <button type="submit" className="primary" value="Enviar">
              Enviar tu Mensaje
            </button>
          </div>
        </form>

        <div className="content-section">
          <div className="title">
            <h1>QUIENES SOMOS</h1>
          </div>
          <div className="content">
            <h3>Lorem ipsum dolor sit amet consectetur, adipisicing elit. </h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rem error reprehenderit itaque, eaque accusamus
              non libero, magnam porro iure est provident temporibus repellat impedit ipsum officia illum voluptatem?
              Ullam odit exercitationem officia fuga voluptas porro delectus quaerat quam, distinctio quo aperiam ex
              ipsam minima cumque alias explicabo expedita fugit laudantium beatae error est animi.
            </p>
            <div className="button">
              <a href="/">Leer mas...</a>
            </div>
          </div>

          <div className="social">
            <a href="/">
              <i className="fab fa-facebook"></i>
            </a>
            <a href="/">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="/">
              <i className="fab fa-twitter"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
