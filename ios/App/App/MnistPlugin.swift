import Capacitor

@objc(MnistPlugin)
public class MnistPlugin: CAPPlugin {
    @objc func infer(_ call: CAPPluginCall) {
        let value = call.getString("value") ?? ""
        call.resolve(["value": value])
    }
}
