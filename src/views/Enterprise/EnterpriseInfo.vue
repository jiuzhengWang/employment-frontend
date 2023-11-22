<template>
<el-card class="page-container">

    <div class="company-info">
        <h1>企业信息</h1>
        <table class="info-table">
            <tr>
                <th>数据项</th>
                <th>值</th>
            </tr>

            <tr>
                <td>所属地区</td>
                <td>市： 
                    <select v-model="company.region.city" :disabled="!editing" @change="updateCounties">
                        <option value="">请选择</option>
                        <option value="昆明市">昆明市</option>
                        <option value="曲靖市">曲靖市</option>
                        <option value="玉溪市">玉溪市</option>
                        <option value="昭通市">昭通市</option>
                        <option value="保山市">保山市</option>
                        <option value="丽江市">丽江市</option>
                        <option value="普洱市">普洱市</option>
                        <option value="临沧市">临沧市</option>
                        <option value="德宏傣族景颇族自治州">德宏傣族景颇族自治州</option>
                        <option value="怒江傈僳族自治州">怒江傈僳族自治州</option>
                        <option value="迪庆藏族自治州">迪庆藏族自治州</option>
                        <option value="大理白族自治州">大理白族自治州</option>
                        <option value="楚雄彝族自治州">楚雄彝族自治州</option>
                        <option value="红河哈尼族彝族自治州">红河哈尼族彝族自治州</option>
                        <option value="文山壮族苗族自治州">文山壮族苗族自治州</option>
                        <option value="西双版纳傣族自治州">西双版纳傣族自治州</option>
                        <!-- 其他市级选项 -->
                    </select> &nbsp;
                    县：
                    <select v-model="company.region.county" :disabled="!editing">
                        <option value="">请选择</option>
                        <option v-for="county in counties" :value="county" v-bind:key="county">{{ county }}</option>
                    </select>
                </td>
            </tr>

            <tr>
                <td>组织机构代码</td>
                <td>
                    <input type="text" v-model="company.orgCode" :disabled="!editing" @blur="validateOrgCode">
                    <span v-if="showOrgCodeError" class="error-message">{{ orgCodeErrorMessage }}</span>
                </td>
            </tr>

            <tr>
                <td>企业名称</td>
                <td>
                    <input type="text" v-model="company.name" :disabled="!editing" @blur="validateCompanyName">
                    <span v-if="showNameError" class="error-message">{{ nameErrorMessage }}</span>
                </td>
            </tr>

            <tr>
                <td>企业性质</td>
                <td>
                    <select v-model="company.propertyLevel1" :disabled="!editing" @change="resetPropertyLevel2">
                        <option value="">请选择</option>
                        <option v-for="property in propertyLevel1Options" :value="property" v-bind:key="property">{{ property }}</option>
                    </select> &nbsp;
                    <select v-model="company.propertyLevel2" :disabled="!editing">
                        <option value="">请选择</option>
                        <option v-for="property in propertyLevel2Options" :value="property" v-bind:key="property">{{ property }}</option>
                    </select>
                </td>
            </tr>

            <tr>
                <td>所属行业</td>
                <td>
                    <select v-model="company.industryLevel1" :disabled="!editing" @change="resetIndustryLevel2">
                        <option value="">请选择</option>
                        <option v-for="industry in industryLevel1Options" :value="industry" v-bind:key="industry">{{ industry }}</option>
                    </select> &nbsp;
                    <select v-model="company.industryLevel2" :disabled="!editing">
                        <option value="">请选择</option>
                        <option v-for="industry in industryLevel2Options" :value="industry" v-bind:key="industry">{{ industry }}</option>
                    </select>
                </td>
            </tr>

            <tr>
                <td>主要经营业务</td>
                <td>
                    <span v-if="!editing">{{ truncateDescription(company.business, 100) }}</span>
                    <textarea v-else v-model="company.business" rows="3" :maxlength="100"></textarea>
                    <p v-if="editing" class="character-count">
                        {{ characterCount }} / 100 字
                    </p>
                </td>
            </tr>

            <tr>
                <td>联系人</td>
                <td>
                    <span v-if="!editing">{{ company.contact }}</span>
                    <input v-else v-model="company.contact" @input="validateContact" />
                    <p v-if="!validContact" class="error-message">联系人只能包含中文或英文字符。</p>
                </td>
            </tr>

            <tr>
                <td>联系地址</td>
                <td>
                    <div v-if="!editing">
                        {{ formatAddress(company.address) }}
                    </div>
                    <div v-else>
                        <input v-model="company.address.district" placeholder="请输入区/镇/乡">
                        <br /><br />
                        <input v-model="company.address.street" placeholder="请输入街道门牌号">
                    </div>
                </td>
            </tr>

            <tr>
                <td>邮政编码</td>
                <td>
                    <div v-if="!editing">
                        {{ company.postalCode }}
                    </div>
                    <div v-else>
                        <input v-model="company.postalCode" placeholder="请输入邮政编码" @input="validatePostalCode"
                            :class="{ 'error': postalCodeError }">
                        <div v-if="postalCodeError" class="error-message">{{ postalCodeErrorMessage }}</div>
                    </div>
                </td>
            </tr>

            <tr>
                <td>联系电话</td>
                <td>
                    <div v-if="!editing">
                        {{ company.phoneNumber }}
                    </div>
                    <div v-else>
                        <input v-model="company.phoneNumber" placeholder="请输入联系电话" @input="validatePhoneNumber"
                            :class="{ 'error': phoneNumberError }">
                        <div v-if="phoneNumberError" class="error-message">{{ phoneNumberErrorMessage }}</div>
                    </div>
                </td>
            </tr>

            <tr>
                <td>传真</td>
                <td>
                    <div v-if="!editing">
                        {{ company.fax }}
                    </div>
                    <div v-else>
                        <input v-model="company.fax" placeholder="请输入传真" @input="validateFax"
                            :class="{ 'error': faxError }">
                        <div v-if="faxError" class="error-message">{{ faxErrorMessage }}</div>
                    </div>
                </td>
            </tr>

            <tr>
                <td>电子邮件</td>
                <td>
                    <div v-if="!editing">
                        {{ company.email }}
                    </div>
                    <div v-else>
                        <input v-model="company.email" placeholder="请输入电子邮件" @input="validateEmail"
                            :class="{ 'error': emailError }">
                        <div v-if="emailError" class="error-message">{{ emailErrorMessage }}</div>
                    </div>
                </td>
            </tr>
        </table>
        <br>
        <button @click="toggleEditing" class="save-button">{{ editing ? '保存' : '编辑' }}</button>
    </div>
</el-card>
</template>

<!-- 省略其他代码 -->


<script>
export default {
    data() {
        return {
            company: {
                region: {
                    city: '',
                    county: ''
                },
                orgCode: '',
                name: '',
                propertyLevel1: '',
                propertyLevel2: '',
                industryLevel1: '',
                industryLevel2: '',
                business: '',
                contact: '',
                address: {
                    district: '',
                    street: '',
                },
                postalCode: '',
                phoneNumber: '',
                fax: '',
                email: '',
            },
            editing: false,
            cityCounties: {
                '昆明市': ['呈贡区', '盘龙区', '五华区', '官渡区', '西山区', '晋宁区', '东川区', '安宁市', '富民县', '宜良县', '嵩明县', '石林彝族自治县', '禄劝彝族苗族自治县', '寻甸回族彝族自治县'],
                '曲靖市': ['麒麟区', '沾益区', '马龙区', '宣威市', '富源县', '罗平县', '师宗县', '陆良县', '会泽县'],
                '玉溪市': ['红塔区', '江川区', '澄江县', '通海县', '华宁县', '易门县', '峨山彝族自治县', '新平彝族傣族自治县', '元江哈尼族彝族傣族自治县'],
                '昭通市': ['昭阳区', '水富市', '鲁甸县', '巧家县', '盐津县', '大关县', '永善县', '绥江县', '镇雄县', '彝良县', '威信县'],
                '保山市': ['隆阳区', '腾冲市', '施甸县', '龙陵县', '昌宁县'],
                '丽江市': ['古城区', '永胜县', '华坪县', '玉龙纳西族自治县', '宁蒗彝族自治县'],
                '普洱市': ['思茅区', '宁洱哈尼族彝族自治县', '墨江哈尼族自治县', '景东彝族自治县', '景谷傣族彝族自治县', '镇沅彝族哈尼族拉祜族自治县', '江城哈尼族彝族自治县', '孟连傣族拉祜族佤族自治县', '澜沧拉祜族自治县', '西盟佤族自治县'],
                '临沧市': ['临翔区', '凤庆县', '云县', '永德县', '镇康县', '双江拉祜族佤族布朗族傣族自治县', '耿马傣族佤族自治县', '沧源佤族自治县'],
                '德宏傣族景颇族自治州': ['芒市', '瑞丽市', '梁河县', '盈江县', '陇川县'],
                '怒江傈僳族自治州': ['泸水市', '福贡县', '贡山独龙族怒族自治县', '兰坪白族普米族自治县'],
                '迪庆藏族自治州': ['香格里拉市', '德钦县', '维西傈僳族自治县'],
                '大理白族自治州': ['大理市', '祥云县', '宾川县', '弥渡县', '永平县', '云龙县', '洱源县', '剑川县', '鹤庆县', '漾濞彝族自治县', '南涧彝族自治县', '巍山彝族回族自治县'],
                '楚雄彝族自治州': ['楚雄市', '双柏县', '牟定县', '南华县', '姚安县', '大姚县', '永仁县', '元谋县', '武定县', '禄丰县'],
                '红河哈尼族彝族自治州': ['蒙自市', '个旧市', '开远市', '弥勒市', '建水县', '石屏县', '泸西县', '绿春县', '元阳县', '红河县', '金平苗族瑶族傣族自治县', '河口瑶族自治县', '屏边苗族自治县'],
                '文山壮族苗族自治州': ['文山市', '砚山县', '西畴县', '麻栗坡县', '马关县', '丘北县', '广南县', '富宁县'],
                '西双版纳傣族自治州': ['景洪市', '勐海县', '勐腊县']
                // 其他市对应的县子选项
            },
            counties: [],
            showOrgCodeError: false,
            orgCodeErrorMessage: '',
            showNameError: false,
            nameErrorMessage: '',
            propertyLevel1Options: [
                '国有企业',
                '集体企业',
                '联营企业',
                '股份合作制企业',
                '私营企业',
                '个体户',
                '合伙企业',
                '有限责任公司',
                '股份有限公司'
            ],
            propertyLevel2Options: [],
            industryLevel1Options: [
                '农、林、牧、渔业',
                '采矿业',
                '制造业',
                '电力、热力、燃气及水生产和供应业',
                '建筑业',
                '批发和零售业',
                '交通运输、仓储和邮政业',
                '住宿和餐饮业'
            ],
            industryLevel2Options: [],
            validContact: true,
            postalCodeError: false,
            postalCodeErrorMessage: '',
            phoneNumberError: false,
            phoneNumberErrorMessage: '',
            faxError: false,
            faxErrorMessage: '',
            emailError: false,
            emailErrorMessage: '',
        };
    },
    computed: {
        characterCount() {
            return this.company.business.length;
        },
    },
    methods: {
        toggleEditing() {
            this.editing = !this.editing;
        },
        updateCounties() {
            const selectedCity = this.company.region.city;
            this.counties = this.cityCounties[selectedCity] || [];
            this.company.region.county = '';
        },
        validateOrgCode() {
            const orgCodePattern = /^[A-Z0-9]{8}[A-Z0-9]$/;
            if (!orgCodePattern.test(this.company.orgCode)) {
                this.showOrgCodeError = true;
                this.orgCodeErrorMessage = '组织机构代码格式错误，请重新填写。';
                setTimeout(() => {
                    this.showOrgCodeError = false;
                    this.orgCodeErrorMessage = '';
                }, 3000);
            } else {
                this.showOrgCodeError = false;
                this.orgCodeErrorMessage = '';
            }
        },
        validateCompanyName() {
            const namePattern = /^[a-zA-Z\u4e00-\u9fa5]+$/;
            if (!namePattern.test(this.company.name)) {
                this.showNameError = true;
                this.nameErrorMessage = '企业名称只能包含中文或英文字符，请重新填写。';
                setTimeout(() => {
                    this.showNameError = false;
                    this.nameErrorMessage = '';
                }, 3000);
            } else {
                this.showNameError = false;
                this.nameErrorMessage = '';
            }
        },
        resetPropertyLevel2() {
            this.company.propertyLevel2 = '';
        },
        resetIndustryLevel2() {
            this.company.industryLevel2 = '';
        },
        truncateDescription(description, limit) {
            if (description.length <= limit) {
                return description;
            } else {
                return description.slice(0, limit) + '...';
            }
        },
        validateContact() {
            const regex = /^[\u4e00-\u9fa5a-zA-Z\s]+$/; // 匹配中文和英文字符
            if (!regex.test(this.company.contact)) {
                this.validContact = false;
                setTimeout(() => {
                    this.validContact = true;
                }, 3000); // 3秒后清除错误提示
            } else {
                this.validContact = true;
            }
        },
        formatAddress(address) {
            return address.district + address.street;
        },
        validatePostalCode() {
            const regex = /^[1-9]\d{5}$/;
            if (!regex.test(this.company.postalCode)) {
                this.postalCodeError = true;
                this.postalCodeErrorMessage = '邮政编码必须为6位数字';
                setTimeout(() => {
                    this.postalCodeError = false;
                    this.postalCodeErrorMessage = '';
                }, 3000);
            } else {
                this.postalCodeError = false;
                this.postalCodeErrorMessage = '';
            }
        },
        validatePhoneNumber() {
            const regex = /^(\(\d{3,4}\)|\d{3,4}-)?\d{7,8}$|^1\d{10}$/;
            if (!regex.test(this.company.phoneNumber)) {
                this.phoneNumberError = true;
                this.phoneNumberErrorMessage = '联系电话格式不正确';
                setTimeout(() => {
                    this.phoneNumberError = false;
                    this.phoneNumberErrorMessage = '';
                }, 3000);
            } else {
                this.phoneNumberError = false;
                this.phoneNumberErrorMessage = '';
            }
        },
        validateFax() {
            const regex = /^(\(\d{3,4}\)|\d{3,4}-)?\d{7,8}$/;
            if (!regex.test(this.company.fax)) {
                this.faxError = true;
                this.faxErrorMessage = '传真格式不正确';
                setTimeout(() => {
                    this.faxError = false;
                    this.faxErrorMessage = '';
                }, 3000);
            } else {
                this.faxError = false;
                this.faxErrorMessage = '';
            }
        },
        validateEmail() {
            const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            if (!regex.test(this.company.email)) {
                this.emailError = true;
                this.emailErrorMessage = '电子邮件格式不正确';
                setTimeout(() => {
                    this.emailError = false;
                    this.emailErrorMessage = '';
                }, 3000);
            } else {
                this.emailError = false;
                this.emailErrorMessage = '';
            }
        },
    },
    watch: {
        'company.propertyLevel1': function (newLevel1) {
            switch (newLevel1) {
                case '国有企业':
                    this.propertyLevel2Options = ['市场竞争', '金融服务', '功能保障'];
                    break;
                case '集体企业':
                    this.propertyLevel2Options = ['城镇集体所有制', '乡村集体所有制'];
                    break;
                case '联营企业':
                    this.propertyLevel2Options = ['紧密型联营', '半紧密型联营', '松散型联营'];
                    break;
                case '股份合作制企业':
                    this.propertyLevel2Options = ['劳资合作型', '劳资合股型'];
                    break;
                case '私营企业':
                    this.propertyLevel2Options = ['独资企业', '合伙企业', '有限责任公司'];
                    break;
                case '个体户':
                    this.propertyLevel2Options = ['生存型', '成长型', '发展型'];
                    break;
                case '合伙企业':
                    this.propertyLevel2Options = ['有限合伙企业', '普通合伙企业'];
                    break;
                case '有限责任公司':
                    this.propertyLevel2Options = [
                        '自然人独资公司',
                        '法人独资公司',
                        '自然人投资或控股公司',
                        '国有独资公司',
                        '外商投资公司',
                        '外商独资公司'
                    ];
                    break;
                case '股份有限公司':
                    this.propertyLevel2Options = ['上市公司', '非上市公众公司', '非公众公司', '外资公司', '国有公司'];
                    break;
                default:
                    this.propertyLevel2Options = [];
                    break;
            }
        },
        'company.industryLevel1': function (newLevel1) {
            switch (newLevel1) {
                case '农、林、牧、渔业':
                    this.industryLevel2Options = ['农业', '林业', '牧业', '渔业'];
                    break;
                case '采矿业':
                    this.industryLevel2Options = ['煤炭开采和洗选业', '石油和天然气开采业', '黑色金属矿采选业', '有色金属矿采选业', '非金属矿采选业', '其他采矿业'];
                    break;
                case '制造业':
                    this.industryLevel2Options = ['农副食品加工业', '食品制造业', '酒、饮料和精制茶制造业', '烟草制品业', '纺织业', '纺织服装、鞋、帽制造业', '皮革、毛皮、羽毛及其制品和制鞋业', '木材加工和木、竹、藤、棕、草制品业', '家具制造业', '造纸和纸制品业', '印刷和记录媒介复制业', '文教、工美、体育和娱乐用品制造业', '石油、煤炭及其他燃料加工业', '化学原料及化学制品制造业', '医药制造业', '化学纤维制造业', '橡胶和塑料制品业', '非金属矿物制品业', '黑色金属冶炼和压延加工业', '有色金属冶炼和压延加工业', '金属制品业', '通用设备制造业', '专用设备制造业', '汽车制造业', '铁路、船舶、航空航天和其他运输设备制造业', '电气机械和器材制造业', '计算机、通信和其他电子设备制造业', '仪器仪表制造业', '其他制造业'];
                    break;
                case '电力、热力、燃气及水生产和供应业':
                    this.industryLevel2Options = ['电力、热力生产和供应业', '燃气生产和供应业', '水的生产和供应业'];
                    break;
                case '建筑业':
                    this.industryLevel2Options = ['房屋建筑业', '土木工程建筑业', '建筑安装业', '建筑装饰和其他建筑业'];
                    break;
                case '批发和零售业':
                    this.industryLevel2Options = ['批发业', '零售业'];
                    break;
                case '交通运输、仓储和邮政业':
                    this.industryLevel2Options = ['铁路运输业', '道路运输业', '水上运输业', '航空运输业', '管道运输业', '装卸搬运和运输代理业', '仓储业', '邮政业'];
                    break;
                case '住宿和餐饮业':
                    this.industryLevel2Options = ['住宿业', '餐饮业'];
                    break;
                default:
                    this.industryLevel2Options = [];
                    break;
            }
        }
    }
};
</script>

<style scoped>
table {
    width: 100%;
    border-collapse: collapse;
}

th,
td {
    padding: 8px;
    border: 1px solid #ddd;
}

th {
    background-color: #f2f2f2;
}

input,
textarea {
    width: 100%;
}

.error {
    border: 1px solid red;
}

.error-message {
    color: red;
    margin-top: 5px;
}

.company-info {
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
}

.info-table {
    width: 100%;
    border-collapse: collapse;
    font-size: 14px;
}

.info-table th {
    background-color: #f2f2f2;
    text-align: left;
    padding: 10px;
}

.info-table td {
    padding: 10px;
}

.error {
    border: 1px solid red;
}

.error-message {
    color: red;
    margin-top: 5px;
}

.save-button {
    display: block;
    margin-top: 20px;
    padding: 10px 20px;
    background-color: #4caf50;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 14px;
}

.save-button:hover {
    background-color: #45a049;
}</style>