const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "El username es obligatorio"],
    unique: true,
    minlength: [3, "Debe tener al menos 3 caracteres"]
  },
  password: {
    type: String,
    required: [true, "La contraseña es obligatoria"],
    minlength: [6, "Debe tener al menos 6 caracteres"]
  },
  roles: {
    type: [String],
    default: ["user"]
  }
}, {
  timestamps: true
});


//Encriptar password antes de guardar
userSchema.pre("save", async function () {

  if (!this.isModified("password")) return;

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);

});


//Método para comparar contraseñas
userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};


module.exports = mongoose.model("User", userSchema);