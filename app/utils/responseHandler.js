module.exports = {
  yahResponse: async (res, data) => {
    res.status(200).json({ status: true, data });
  },
  nahResoonse: async (res, error, code) => {
    res.status(500).json({ status: false, message:error });
  },
  errorMessage: async (res, message) => {
    res.status(200).json({ status: false, message });
  },
};

