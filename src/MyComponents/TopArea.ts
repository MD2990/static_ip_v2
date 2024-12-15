import { HStack } from "@chakra-ui/react";
import React, { useEffect } from "react";
import SearchInput from "./SearchInput";
import { useSnapshot } from "valtio";
import { TopBtn } from "./BTNs";
import {
	FcBusinessman,
	FcHome,
	FcMultipleSmartphones,
	FcPlus,
	FcPrint,
	FcViewDetails,
} from "react-icons/fc";
import { usePathname, useRouter } from "next/navigation";
import Menus, { MenuItems } from "./Menus";
import state from "@/store";
import router from "next/router";
import path from "path";
import { title } from "process";
import { text } from "stream/consumers";
import printPdf from "./print";

export default function TopArea({ data, path, title }) {
	const snap = useSnapshot(state);
	const pathname = usePathname();
	const router = useRouter();

	return (
		<HStack>
			{pathname === "/" ? null : (
				<WrapItem>
					<TopBtn
						title="Home"
						onClick={() => router.push("/")}
						Icons={<FcHome />}
					/>
				</WrapItem>
			)}
			{snap.searchResults.length ? (
				<WrapItem>
					<TopBtn
						title="Print"
						onClick={() => printPdf()}
						Icons={<FcPrint />}
					/>
				</WrapItem>
			) : null}
			<WrapItem>
				<SearchInput searchData={data} />
			</WrapItem>
			<WrapItem>
				<TopBtn
					title={title}
					onClick={() => router.push(path)}
					Icons={<FcPlus />}
				/>
			</WrapItem>

			<Menus title="Employees" total={state.empTotal}>
				<MenuItems text="Add" path="/add_emp" Icons={FcBusinessman} />
				<MenuItems text="Show" path="/show_emp" Icons={FcViewDetails} />
			</Menus>

			<Menus title="Devices" total={state.devicesTotal}>
				<MenuItems
					text="Add"
					path="/add_device"
					Icons={FcMultipleSmartphones}
				/>
				<MenuItems text="Show" path="/show_device" Icons={FcViewDetails} />
			</Menus>

			<WrapItem align="center" userSelect={"none"}>
				<Stat>
					<StatLabel
						color={"gray.400"}
						whiteSpace={"nowrap"}
						fontSize={[3, 5, 10, 15]}
					>
						{" "}
						Total:{" "}
						<Text
							textShadow="1.8px 0.1px  1px #add8d6"
							ml="2"
							as="span"
							color={"blue.500"}
							fontWeight="bold"
							fontSize={[10, 20, 25, 30]}
						>
							{snap.searchResults.length || 0}
						</Text>
					</StatLabel>
				</Stat>
			</WrapItem>
		</HStack>
	);
}
