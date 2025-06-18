// 관리자
import AdminHome from "@/components/Admin/AdminHome.vue";

// 정보 DB DATA MANAGE
import RicChange from "@/components/Admin/DataManage/RicChange.vue";
import ReportCode from "@/components/Admin/DataManage/ReportCode.vue";
import WorldIndexUpload from "@/components/Admin/DataManage/WorldIndexUpload.vue";
import WorldIndexMod from "@/components/Admin/DataManage/WorldIndexMod.vue";

// 정보 DB DATA MANAGE (BOND)
import BondIndexUpload from "@/components/Admin/DataManage/Bond/BondIndexUpload.vue";
import BondIndexMod from "@/components/Admin/DataManage/Bond/BondIndexMod.vue";
import M058HadreUpload from "@/components/Admin/DataManage/Bond/M058HadreUpload.vue";
import M058Hadre from "@/components/Admin/DataManage/Bond/M058Hadre.vue";
import M058HadreUploadNew from "@/components/Admin/DataManage/Bond/M058HadreUploadNew.vue";
import M058HadreNew from "@/components/Admin/DataManage/Bond/M058HadreNew.vue";
import M058HfrnrefeUpload from "@/components/Admin/DataManage/Bond/M058HfrnrefeUpload.vue";
import M058Hfrnrefe from "@/components/Admin/DataManage/Bond/M058Hfrnrefe.vue";
import M058HfrncsfwUpload from "@/components/Admin/DataManage/Bond/M058HfrncsfwUpload.vue";
import M058Hfrncsfw from "@/components/Admin/DataManage/Bond/M058Hfrncsfw.vue";

// 정보 DB DATA MANAGE (반도체)
import SemiMasterUpload from "@/components/Admin/DataManage/Semi/SemiMasterUpload.vue";
import SemiMasterMod from "@/components/Admin/DataManage/Semi/SemiMasterMod.vue";
import SemiInUpload from "@/components/Admin/DataManage/Semi/SemiInUpload.vue";
import SemiInMod from "@/components/Admin/DataManage/Semi/SemiInMod.vue";
import SemiIndexUpload from "@/components/Admin/DataManage/Semi/SemiIndexUpload.vue";
import SemiIndexMod from "@/components/Admin/DataManage/Semi/SemiIndexMod.vue";

// 정보 DB DATA MANAGE (ETF)
import EtfFeeUpload from "@/components/Admin/DataManage/Etf/EtfFeeUpload.vue";
import GlobalEtfDesc from "@/components/Admin/DataManage/Etf/GlobalEtfDesc.vue";
import GlobalEtfDescTrans from "@/components/Admin/DataManage/Etf/GlobalEtfDescTrans.vue";

// ETP DB DATA MANAGE
import M054udate from "@/components/Admin/Migration/M054udate.vue";

// ETP DB DATA MANAGE
import EtfDivInfo from "@/components/Admin/Etp/EtfDivInfo.vue";
import EtfFeeInfo from "@/components/Admin/Etp/EtfFeeInfo.vue";
import EtfCtgInfo from "@/components/Admin/Etp/EtfCtgInfo.vue";
import EtpCorrelFile from "@/components/Admin/Etp/EtpCorrelFile.vue";

// MEMBER MANAGE
import MemberManage from "@/components/Admin/Member/MemberManage.vue";

//export const routes = [
export default [
  {
    path: "/admintool",
    component: AdminHome,
    children: [
      // 정보DB DATA MANAGE
      { path: "ricchange", component: RicChange },
      { path: "reportcode", component: ReportCode },
      { path: "worldindexupload", component: WorldIndexUpload },
      { path: "worldindexmod", component: WorldIndexMod },
      // 정보DB DATA MANAGE(채권)
      { path: "bond/bondindexupload", component: BondIndexUpload },
      { path: "bond/bondindexmod", component: BondIndexMod },
      { path: "bond/m058hadreupload", component: M058HadreUpload },
      { path: "bond/m058hadre", component: M058Hadre },
      { path: "bond/m058hadreuploadnew", component: M058HadreUploadNew },
      { path: "bond/m058hadrenew", component: M058HadreNew },
      { path: "bond/m058hfrnrefeupload", component: M058HfrnrefeUpload },
      { path: "bond/m058hfrnrefe", component: M058Hfrnrefe },
      { path: "bond/m058hfrncsfwupload", component: M058HfrncsfwUpload },
      { path: "bond/m058hfrncsfw", component: M058Hfrncsfw },
      // 정보DB DATA MANAGE(반도체)
      { path: "semimasterupload", component: SemiMasterUpload },
      { path: "semimastermod", component: SemiMasterMod },
      { path: "semiinupload", component: SemiInUpload },
      { path: "semiinmod", component: SemiInMod },
      { path: "semiindexupload", component: SemiIndexUpload },
      { path: "semiindexmod", component: SemiIndexMod },
      // 정보DB DATA MANAGE(ETF)
      { path: "etffeeupload", component: EtfFeeUpload },
      { path: "globaletfdesc", component: GlobalEtfDesc },
      { path: "globaletfdesctrans", component: GlobalEtfDescTrans },
      // MIGRATION
      { path: "migration/m054udate", component: M054udate },
      // ETP DB DATA MANAGE
      { path: "etfdivinfo", component: EtfDivInfo },
      { path: "etffeeinfo", component: EtfFeeInfo },
      { path: "etfctginfo", component: EtfCtgInfo },
      { path: "etpcorrelfile", component: EtpCorrelFile },
      // MEMBER MANAGE
      { path: "member", component: MemberManage },
    ],
  },
];
