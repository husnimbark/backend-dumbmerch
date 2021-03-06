const { product, user, category, productCategory } = require("../../models");

exports.getProduct = async (req, res) => {
  try {
    let data = await product.findAll({
      include: [
        {
          model: user,
          as: "user",
          attributes: {
            exclude: ["createdAt", "updatedAt", "password"],
          },
        },
        {
          model: category,
          as: "categories",
          through: {
            model: productCategory,
            as: "bridge",
            attributes: [],
          },
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
        },
      ],
      attributes: {
        exclude: ["createdAt", "updatedAt", "idUser"],
      },
    });

    data = data.map((item) => {
      item.image = 'http://localhost:3500/uploads/' + item.image

      return item
    })

    res.send({
      status: "success...",
      data,
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "Server Error",
    });
  }
};

exports.addProduct = async (req, res) => {
  try {
    // const { category: categoryName, ...data } = req.body;
    
    // code here
    const data = await product.create({
      ...req.body,
      image: req.file.filename,
      idUser: req.user.id
    })

    res.send({
      message: 'Add Product finished',
      data
    })

    // const categoryData = await category.findOne({
    //   where: {
    //     name: categoryName,
    //   },
    // });

    // if (categoryData) {
    //   await productCategory.create({
    //     idCategory: categoryData.id,
    //     idProduct: newProduct.id,
    //   });
    // } else {
    //   const newCategory = await category.create({ name: categoryName });
    //   await productCategory.create({
    //     idCategory: newCategory.id,
    //     idProduct: newProduct.id,
    //   });
    // }

    let productData = await product.findOne({
      where: {
        id: newProduct.id,
      },
      include: [
        {
          model: user,
          as: "user",
          attributes: {
            exclude: ["createdAt", "updatedAt", "password"],
          },
        },
        {
          model: category,
          as: "categories",
          through: {
            model: productCategory,
            as: "bridge",
            attributes: [],
          },
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
        },
      ],
      attributes: {
        exclude: ["createdAt", "updatedAt", "idUser"],
      },
    });
    
    // code here
  
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "failed",
      message: "Server Error",
    });
  }
};
