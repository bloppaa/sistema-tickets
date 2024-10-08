import Client from "../models/clientModel.js";
import bcrypt from "bcrypt";

export const getClients = async (req, res, next) => {
  try {
    const clients = await Client.findAll();
    return res.status(200).send(clients);
  } catch (err) {
    next(err);
  }
};

export const getClientById = async (req, res, next) => {
  try {
    const client = await Client.findByPk(req.params.id);

    if (!client) {
      return res.status(404).send({ message: "Client not found" });
    }

    return res.status(200).send(client);
  } catch (err) {
    next(err);
  }
};

export const createClient = async (req, res, next) => {
  const { name, rut, companyRut, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const client = await Client.create({
      name,
      rut,
      companyRut,
      email,
      password: hashedPassword,
    });

    return res.status(201).send({ message: "Client created", client });
  } catch (err) {
    next(err);
  }
};

export const updateClient = async (req, res, next) => {
  const { name, rut, companyRut, email, password } = req.body;

  try {
    const client = await Client.findByPk(req.params.id);

    if (!client) {
      return res.status(404).send({ message: "Client not found" });
    }

    // Solo hashear la contraseña si se envió una
    let hashedPassword = password;
    if (password) {
      hashedPassword = await bcrypt.hash(password, 10);
    }

    await client.update({
      name,
      rut,
      companyRut,
      email,
      password: hashedPassword,
    });

    return res.status(200).send({ message: "Client updated", client });
  } catch (err) {
    next(err);
  }
};

export const deleteClient = async (req, res, next) => {
  try {
    const client = await Client.findByPk(req.params.id);

    if (!client) {
      return res.status(404).send({ message: "Client not found" });
    }

    await client.destroy();

    return res.status(200).send({ message: "Client deleted" });
  } catch (err) {
    next(err);
  }
};

export default {
  getClients,
  getClientById,
  createClient,
  updateClient,
  deleteClient,
};
