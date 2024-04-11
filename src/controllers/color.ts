import { Color } from "../core/domain/color";
import { colorRepository } from "../repositories/color";
import { CommonController } from "../shared/utils";

export const colorController = new CommonController<Color>(
  colorRepository,
  "Color"
);
