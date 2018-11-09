import * as express from "express";
import * as fs from "fs-extra";
import * as json2csv from "json2csv";
import { CitySubArea } from "./model/CitySubArea";
import { BusinessCircle } from "./model/BusinessCircle";

/**
 * 浏览器提交子区域
 * @param req 请求
 * @param res 相应
 * @param next 后处理函数
 */
function postCitySubArea(req: express.Request, res: express.Response, next: express.NextFunction) {
    var data: CitySubArea = JSON.parse(req.body.body);
    fs.ensureDir("data", (err) => {
        if (err) {
            res.json({
                err: "无法创建文件夹",
                msg: err.message
            })
        } else {
            json2csv({ data: data.sub }, (err, csv) => {
                if (err) console.log(err);
                else {
                    fs.writeFile("data/CitySubArea.csv", csv, (err) => {
                        if (err) console.log(err);
                        else console.log("城市数据写完文件完成");
                    })
                }
            })
        }
    })
}

/**
 * 浏览器提交商圈
 * @param req 请求
 * @param res 响应
 * @param next 后处理函数
 */
function postBusinessCircle(req: express.Request, res: express.Response, next: express.NextFunction) {
    var data: {name: string, city: string, business: BusinessCircle[]} = JSON.parse(req.body.body);
    var dir = "data/BusinessCircle";
    fs.ensureDir(dir, (err) => {
        if (err) {
            res.json({
                err: "无法创建文件夹",
                msg: err.message
            })
        } else {
            fs.writeFile(`${dir}/${data.name}.json`, JSON.stringify({
                name: data.name,
                business: data.business.filter(x => x.city === data.city)
            }), (err) => {
                if (err) console.log(err);
                else {
                    console.log(`${data.name}写文件完成`);
                    res.send("success")
                }
            })
        }
    })
}

var router = express.Router();
router.post("/citySubArea", postCitySubArea)
router.post("/businessCircle", postBusinessCircle)

module.exports = router;